import { IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
    @IsString()
    email

    @IsString()
    @IsOptional()
    password

    @IsString()
    name

    @IsString()
    @IsOptional()
    provider

    @IsString()
    @IsOptional()
    providerId
}
