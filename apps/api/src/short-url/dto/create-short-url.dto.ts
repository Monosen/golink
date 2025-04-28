import {
    IsString,
    Matches,
    IsOptional,
    IsDate,
    IsInt,
    Min
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreateShortUrlDto {
    @IsString()
    @Matches(/^[a-zA-Z0-9]+$/, {
        message: 'shortCode must contain only alphanumeric characters'
    })
    shortCode: string

    @IsString()
    longUrl: string

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    startDate?: Date

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    endDate?: Date

    @IsOptional()
    @IsInt()
    @Min(1)
    clickLimit?: number
}
