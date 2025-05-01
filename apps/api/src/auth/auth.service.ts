import { Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'

import * as argon2 from 'argon2'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { lastValueFrom } from 'rxjs'
import { UserService } from 'src/user/user.service'

interface GitHubTokenResponse {
  access_token: string
  token_type: string
  scope: string
}

interface GitHubUserResponse {
  id: number
  name: string
  email: string
}

interface GitHubEmailResponse {
  email: string
  primary: boolean
  verified: boolean
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  async githubLogin(code: string) {
    try {
      const tokenResponse = await lastValueFrom(
        this.httpService.post<GitHubTokenResponse>(
          'https://github.com/login/oauth/access_token',
          {
            client_id: this.configService.get<string>('GITHUB_CLIENT_ID'),
            client_secret: this.configService.get<string>(
              'GITHUB_CLIENT_SECRET'
            ),
            code,
          },
          {
            headers: { Accept: 'application/json' },
          }
        )
      )

      const accessToken = tokenResponse.data.access_token

      // Obtener información del usuario desde GitHub
      const userResponse = await lastValueFrom(
        this.httpService.get<GitHubUserResponse>(
          'https://api.github.com/user',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
      )

      // Obtener los emails del usuario desde GitHub
      const userEmailResponse = await lastValueFrom(
        this.httpService.get<GitHubEmailResponse[]>(
          'https://api.github.com/user/emails',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
      )

      console.log('userEmailResponse', userEmailResponse.data)

      const userEmail = userEmailResponse.data.find(
        email => email.primary
      )?.email

      if (!userEmail) {
        throw new UnauthorizedException(
          'No se encontró un email primario en la cuenta de GitHub'
        )
      }

      // Verificar si el usuario ya existe en la base de datos
      const existingUser = await this.userService.findByEmail(userEmail)

      console.log('Usuario creado:', existingUser)

      if (existingUser) {
        // Si el usuario ya existe, simplemente devuelve el token
        return {
          user: existingUser,
          token: this.getJwtToken({ id: existingUser.id }),
        }
      }

      const user = await this.prismaService.user.create({
        data: {
          email: userEmail,
          name: userResponse.data.name,
          provider: 'github',
          providerId: `${userResponse.data.id}`,
          password: null, // No se necesita contraseña para el login de GitHub
        },
        select: {
          id: true,
          email: true,
          name: true,
          provider: true,
        },
      })

      console.log('Usuario creado:', user)

      return { user: user, token: this.getJwtToken({ id: user.id }) }
    } catch (error) {
      console.error('Error durante el login de GitHub:', error)
      throw new Error('GitHub login failed')
    }
  }

  async register(registerUserDto: RegisterUserDto) {
    const { password, ...userData } = registerUserDto

    const user = await this.prismaService.user.create({
      data: {
        ...userData,
        password: await argon2.hash(password, {
          salt: Buffer.alloc(16),
        }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        provider: false,
        providerId: false,
        password: false,
      },
    })

    return { user: user, token: this.getJwtToken({ id: user.id }) }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        provider: false,
        providerId: false,
        password: true,
      },
    })

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)')

    if (!(await argon2.verify(user.password!, password)))
      throw new UnauthorizedException('Credentials are not valid (password)')

    return {
      user: { ...user, password: undefined },
      token: this.getJwtToken({ id: user.id }),
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }
}
