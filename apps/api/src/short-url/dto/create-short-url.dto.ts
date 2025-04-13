import { IsString, Matches } from 'class-validator'

export class CreateShortUrlDto {
    @IsString()
    @Matches(/^[a-zA-Z0-9]+$/, {
        message: 'shortCode must contain only alphanumeric characters'
    })
    shortCode: string

    @IsString()
    longUrl: string
}
