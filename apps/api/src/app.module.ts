import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { ShortUrlModule } from './short-url/short-url.module'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule,
        UserModule,
        AuthModule,
        ShortUrlModule,
        CacheModule.register({
            isGlobal: true,
            ttl: 3600000 // 1 hora por defecto
        })
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
