import { Length, IsEmail, IsNumberString } from "class-validator"

export class PasswordResetRequestDTO {

  @IsEmail()
  email: string

}

export class VerifyEmailDTO {

  @IsEmail()
  email: string

  @IsNumberString()
  @Length(6, 6)
  code: string

}

export class ResetPasswordDTO {

  @IsEmail()
  email: string

  @Length(3, 30)
  password: string

  @Length(3, 250)
  code: string

}