import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards
} from '@nestjs/common'
import { ShortUrlService } from './short-url.service'
import { CreateShortUrlDto } from './dto/create-short-url.dto'
import { UpdateShortUrlDto } from './dto/update-short-url.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/auth/decorators/get-user.decorator'
import { User } from '@prisma/client'

@Controller('short-url')
export class ShortUrlController {
    constructor(private readonly shortUrlService: ShortUrlService) {}

    @Post('create')
    @UseGuards(AuthGuard())
    create(
        @GetUser() user: User,
        @Body() createShortUrlDto: CreateShortUrlDto
    ) {
        return this.shortUrlService.create(createShortUrlDto, user)
    }

    @Get('all')
    @UseGuards(AuthGuard())
    findAll() {
        return this.shortUrlService.findAll()
    }

    @Get('one/:id')
    @UseGuards(AuthGuard())
    findOne(@Param('id') id: string) {
        return this.shortUrlService.findOne(+id)
    }

    @Patch('update/:id')
    @UseGuards(AuthGuard())
    update(
        @Param('id') id: string,
        @Body() updateShortUrlDto: UpdateShortUrlDto
    ) {
        return this.shortUrlService.update(+id, updateShortUrlDto)
    }

    @Delete('remove/:id')
    @UseGuards(AuthGuard())
    remove(@Param('id') id: string) {
        return this.shortUrlService.remove(+id)
    }
}
