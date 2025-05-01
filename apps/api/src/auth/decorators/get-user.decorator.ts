import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { Request } from 'express'

export const GetUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request & { user: User }>()
    const user = req.user

    if (!user)
      throw new InternalServerErrorException('User not found (request)')

    return !data ? user : user[data]
  }
)
