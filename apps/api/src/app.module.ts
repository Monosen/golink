import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { ShortUrlModule } from './short-url/short-url.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule,
        UserModule,
        AuthModule,
        ShortUrlModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
