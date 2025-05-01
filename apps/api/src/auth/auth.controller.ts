import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('github')
  githubLogin(@Body() body: { code: string }) {
    return this.authService.githubLogin(body.code)
  }

  @Post('register')
  registerUser(@Body() registerUser: RegisterUserDto) {
    return this.authService.register(registerUser)
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Get('check-auth')
  @UseGuards(AuthGuard())
  checkAuth() {
    return { message: 'Authenticated' }
  }
}
