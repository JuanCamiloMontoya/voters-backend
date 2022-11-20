import { ApiProperty } from "@nestjs/swagger"
import { Length, IsEmail } from "class-validator"

export class LoginDTO {

  @IsEmail()
  @ApiProperty({
    example: "pepe@gmail.com"
  })
  readonly email: string


  @Length(8, 30)
  @ApiProperty({
    example: "as5Ñs1T81w",
    minLength: 8
  })
  readonly password: string
}