import { Length, IsEmail, IsOptional, IsNumber, Min, Max } from "class-validator"

export class UpdatePasswordDTO {

  @IsEmail()
  email: string

  @Length(3, 30)
  newPassword: string

  @IsNumber()
  @Min(100000)
  @Max(999999)
  @IsOptional()
  recoverPasswordCode: number

  @Length(3, 30)
  @IsOptional()
  oldPassword: string

}