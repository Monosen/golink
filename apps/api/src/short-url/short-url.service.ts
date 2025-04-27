import { Injectable, NotFoundException, Inject } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { CreateShortUrlDto } from './dto/create-short-url.dto'
import { UpdateShortUrlDto } from './dto/update-short-url.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from '@prisma/client'
import { Cache } from 'cache-manager'

@Injectable()
export class ShortUrlService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    // Crear una nueva URL corta
    async create(createShortUrlDto: CreateShortUrlDto, user: User) {
        try {
            const shortUrl = await this.prismaService.shortUrl.create({
                data: {
                    shortCode: createShortUrlDto.shortCode,
                    longUrl: createShortUrlDto.longUrl,
                    userId: user.id
                },
                select: {
                    id: true,
                    shortCode: true,
                    longUrl: true,
                    createdAt: true
                }
            })

            return shortUrl
        } catch {
            throw new Error('Error creating short URL')
        }
    }

    // Obtener todas las URLs cortas
    async findAll(user: User) {
        const shortUrls = await this.prismaService.shortUrl.findMany({
            where: { userId: user.id },
            select: {
                id: true,
                shortCode: true,
                longUrl: true,
                clickCount: true,
                createdAt: true
            }
        })

        return shortUrls
    }

    // Obtener una URL corta por su ID
    async findOne(id: number, user: User) {
        const shortUrl = await this.prismaService.shortUrl.findUnique({
            where: { id, userId: user.id }
        })

        if (!shortUrl) {
            throw new NotFoundException(`Short URL with ID ${id} not found`)
        }

        return shortUrl
    }

    // Actualizar una URL corta por su ID
    async update(id: number, updateShortUrlDto: UpdateShortUrlDto, user: User) {
        const shortUrl = await this.prismaService.shortUrl.findUnique({
            where: { id, userId: user.id }
        })

        if (!shortUrl) {
            throw new NotFoundException(`Short URL with ID ${id} not found`)
        }

        return this.prismaService.shortUrl.update({
            where: { id },
            data: {
                shortCode: updateShortUrlDto.shortCode,
                longUrl: updateShortUrlDto.longUrl
            }
        })
    }

    // Eliminar una URL corta por su ID
    async remove(id: number, user: User) {
        const shortUrl = await this.prismaService.shortUrl.findUnique({
            where: { id, userId: user.id }
        })

        if (!shortUrl) {
            throw new NotFoundException(`Short URL with ID ${id} not found`)
        }

        return this.prismaService.shortUrl.delete({
            where: { id }
        })
    }

    // Redirigir a la URL larga
    async redirect(shortUrl: string) {
        // Intentar obtener la URL del caché primero
        const cachedUrl = await this.cacheManager.get<string>(`url:${shortUrl}`)
        if (cachedUrl) {
            // Actualizar el contador de clicks de manera asíncrona
            this.incrementClickCount(shortUrl).catch(console.error)
            return { longUrl: cachedUrl }
        }

        // Si no está en caché, buscar en la base de datos
        const shortUrlData = await this.prismaService.shortUrl.findUnique({
            where: { shortCode: shortUrl },
            select: { longUrl: true } // Solo seleccionar el campo necesario
        })

        if (!shortUrlData) {
            throw new NotFoundException(`Short URL ${shortUrl} not found`)
        }

        // Guardar en caché para futuras solicitudes
        await this.cacheManager.set(
            `url:${shortUrl}`,
            shortUrlData.longUrl,
            3600000
        ) // 1 hora de caché

        // Actualizar el contador de clicks de manera asíncrona
        this.incrementClickCount(shortUrl).catch(console.error)

        return {
            longUrl: shortUrlData.longUrl
        }
    }

    private async incrementClickCount(shortUrl: string): Promise<void> {
        await this.prismaService.shortUrl.update({
            where: { shortCode: shortUrl },
            data: {
                clickCount: {
                    increment: 1
                }
            }
        })
    }
}
