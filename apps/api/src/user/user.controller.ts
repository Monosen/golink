import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { User } from '@prisma/client'
import { GetUser } from 'src/auth/decorators/get-user.decorator'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  findById(@GetUser() user: User) {
    return this.userService.findById(user.id)
  }

  @Patch('me')
  update(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto)
  }

  @Delete('me')
  remove(@GetUser() user: User) {
    return this.userService.remove(user.id)
  }
}
