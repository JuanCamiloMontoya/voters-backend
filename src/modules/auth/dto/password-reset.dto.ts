import { ApiProperty } from "@nestjs/swagger"
import { Length, IsEmail, IsNumberString, Matches, MinLength } from "class-validator"
import { Match } from "src/@common/decorators/match.decorator"

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
    description: "Cadena numérica",
    example: "456987",
    minLength: 6,
    maxLength: 6
  })
  readonly code: string
}

export class ResetPasswordDTO extends VerifyEmailDTO {
  @Length(3, 30)
  @MinLength(8, { message: 'La contraseña debe tener mínimo 8 carácteres!' })
  @Matches(/[a-z]{1,}/, { message: 'La contraseña debe tener mínimo una letra minúscula!' })
  @Matches(/[A-Z]{1,}/, { message: 'La contraseña debe tener mínimo una letra mayúscula!' })
  @Matches(/[0-9]{1,}/, { message: 'La contraseña debe tener mínimo un número!' })
  @Matches(/[!@#$%\-+&_*]{1,}/, { message: 'La contraseña debe tener mínimo caracter especial (!@#$%\-+&_*)!' })
  @ApiProperty({
    example: "LrA@n98_76",
    minLength: 8,
    maxLength: 30,
    description: `Mínimo 8 carácters que incluyan al menos una letra minúscula (/[a-z]{1,}/),
    una letra mayúscula (/[A-Z]{1,}/), un número (/[0-9]{1,}/) y un carácter especial (/[!@#$%\-+&_*]{1,}/)`
  })
  password: string

  @Match('password', { message: 'Las contraseñas no coinciden!' })
  @ApiProperty({
    example: "as5Ñs1T81w",
    description: "Debe ser igual a 'password'"
  })
  passwordConfirm: string
}