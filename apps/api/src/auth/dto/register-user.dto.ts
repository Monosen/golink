import { IsString, MinLength } from 'class-validator'
import { LoginUserDto } from './login-user.dto'

export class RegisterUserDto extends LoginUserDto {
  @IsString()
  @MinLength(1)
  name: string
}
