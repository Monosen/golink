import { Module } from '@nestjs/common'
import { ShortUrlService } from './short-url.service'
import { ShortUrlController } from './short-url.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
  imports: [PrismaModule, AuthModule],
})
export class ShortUrlModule {}
