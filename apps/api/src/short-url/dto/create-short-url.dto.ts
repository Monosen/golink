import { IsAlphanumeric, IsString } from 'class-validator'

export class CreateShortUrlDto {
    @IsString()
    @IsAlphanumeric()
    shortCode: string

    @IsString()
    longUrl: string
}
