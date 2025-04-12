import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateShortUrlDto } from './dto/create-short-url.dto'
import { UpdateShortUrlDto } from './dto/update-short-url.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from '@prisma/client'

@Injectable()
export class ShortUrlService {
    constructor(private readonly prismaService: PrismaService) {}

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
    async findAll() {
        const shortUrls = await this.prismaService.shortUrl.findMany()

        return shortUrls
    }

    // Obtener una URL corta por su ID
    async findOne(id: number) {
        const shortUrl = await this.prismaService.shortUrl.findUnique({
            where: { id }
        })

        if (!shortUrl) {
            throw new NotFoundException(`Short URL with ID ${id} not found`)
        }

        return shortUrl
    }

    // Actualizar una URL corta por su ID
    async update(id: number, updateShortUrlDto: UpdateShortUrlDto) {
        const shortUrl = await this.prismaService.shortUrl.findUnique({
            where: { id }
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
    async remove(id: number) {
        const shortUrl = await this.prismaService.shortUrl.findUnique({
            where: { id }
        })

        if (!shortUrl) {
            throw new NotFoundException(`Short URL with ID ${id} not found`)
        }

        return this.prismaService.shortUrl.delete({
            where: { id }
        })
    }
}
