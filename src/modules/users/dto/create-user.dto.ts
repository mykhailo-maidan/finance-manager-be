import { IsEmail, isNotEmpty, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  surname: string

  @IsNotEmpty()
  @IsEmail()
  email: string

}
