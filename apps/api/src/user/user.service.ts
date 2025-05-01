import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
      },
      select: {
        id: false,
        email: true,
        name: true,
        provider: false,
        providerId: false,
        password: false,
      },
    })

    return user
  }

  async findById(id: number) {
    if (!id) {
      throw new Error('ID is required')
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: false,
        email: true,
        name: true,
        provider: false,
        providerId: false,
        password: false,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new Error('email is required')
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        provider: true,
        providerId: false,
        password: false,
      },
    })

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!id) {
      throw new Error('ID is required')
    }

    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    })

    return user
  }

  async remove(id: number) {
    if (!id) {
      throw new Error('ID is required')
    }

    await this.prismaService.user.delete({
      where: {
        id,
      },
    })
  }
}
