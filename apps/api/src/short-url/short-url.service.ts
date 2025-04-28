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

    async create(createShortUrlDto: CreateShortUrlDto, user: User) {
        try {
            const shortUrl = await this.prismaService.shortUrl.create({
                data: {
                    shortCode: createShortUrlDto.shortCode,
                    longUrl: createShortUrlDto.longUrl,
                    userId: user.id,
                    clickLimit: createShortUrlDto.clickLimit
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

    async findAll(user: User) {
        const shortUrls = await this.prismaService.shortUrl.findMany({
            where: { userId: user.id },
            select: {
                id: true,
                shortCode: true,
                longUrl: true,
                clickCount: true,
                createdAt: true,
                clickLimit: true
            }
        })

        return shortUrls
    }

    async findOne(id: number, user: User) {
        try {
            const shortUrl = await this.prismaService.shortUrl.findUnique({
                where: { id, userId: user.id }
            })

            if (!shortUrl) {
                throw new NotFoundException(`Short URL with ID ${id} not found`)
            }

            return shortUrl
        } catch (error) {
            console.error(
                `Error finding short URL with ID ${id}: ${error.message}`
            )
            throw new NotFoundException(`Short URL with ID ${id} not found`)
        }
    }

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

    async redirect(shortUrl: string) {
        // Intentar obtener la URL del caché primero
        const cachedUrl = await this.cacheManager.get<string>(`url:${shortUrl}`)

        // Buscar en la base de datos para verificar el límite de clics
        const shortUrlData = await this.prismaService.shortUrl.findUnique({
            where: { shortCode: shortUrl },
            select: {
                longUrl: true,
                clickCount: true,
                clickLimit: true
            }
        })

        if (!shortUrlData) {
            throw new NotFoundException(`Short URL ${shortUrl} not found`)
        }

        // Verificar si se ha alcanzado el límite de clics
        if (
            shortUrlData.clickLimit &&
            shortUrlData.clickCount >= shortUrlData.clickLimit
        ) {
            throw new NotFoundException('Click limit reached for this URL')
        }

        // Si está en caché, actualizar contador y retornar
        if (cachedUrl) {
            this.incrementClickCount(shortUrl).catch(console.error)
            return { longUrl: cachedUrl }
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

    async generateRandomCode(): Promise<{ randomCode: string }> {
        try {
            const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            const lowercase = 'abcdefghijklmnopqrstuvwxyz'
            const numbers = '0123456789'
            const allChars = uppercase + lowercase + numbers

            // Asegurar al menos una mayúscula, una minúscula y un número
            let randomCode = ''
            randomCode +=
                uppercase[Math.floor(Math.random() * uppercase.length)]
            randomCode +=
                lowercase[Math.floor(Math.random() * lowercase.length)]
            randomCode += numbers[Math.floor(Math.random() * numbers.length)]

            // Completar el resto del código
            for (let i = 3; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * allChars.length)
                randomCode += allChars[randomIndex]
            }

            // Mezclar el código
            randomCode = randomCode
                .split('')
                .sort(() => Math.random() - 0.5)
                .join('')

            const existingUrl = await this.prismaService.shortUrl.findUnique({
                where: { shortCode: randomCode }
            })

            if (existingUrl) {
                return this.generateRandomCode()
            }

            return { randomCode }
        } catch (error) {
            console.error('Error generating random code:', error)
            throw new Error('Error generating random code')
        }
    }
}
