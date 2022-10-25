import { ApiProperty } from "@nestjs/swagger"
import { Length, IsEmail, IsNumberString } from "class-validator"

export class PasswordResetRequestDTO {
  @IsEmail()
  @ApiProperty({
    example: "pepe@gmail.com"
  })
  readonly email: string
}

export class VerifyEmailDTO extends PasswordResetRequestDTO {
  @IsNumberString()
  @Length(6, 6)
  @ApiProperty({
    example: "456987",
    description: "Cadena numérica",
    minLength: 6,
    maxLength: 6
  })
  readonly code: string
}

export class ResetPasswordDTO extends VerifyEmailDTO {
  @Length(3, 30)
  @ApiProperty({
    example: "as5Ñs1T81w"
  })
  readonly password: string
}