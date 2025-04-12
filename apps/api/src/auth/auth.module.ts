import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PrismaModule } from 'src/prisma/prisma.module'
import { HttpModule } from '@nestjs/axios'
import { UserModule } from 'src/user/user.module'

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [
        ConfigModule,
        PrismaModule,
        HttpModule,
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                // console.log('JWT Secret', configService.get('JWT_SECRET') )
                // console.log('JWT SECRET', process.env.JWT_SECRET)
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: '2h'
                    }
                }
            }
        })
    ],
    exports: [JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
