import { ApiProperty } from "@nestjs/swagger"
import { LoginResponse } from "./login.response"

export class PasswordResetRequestResponse {
  @ApiProperty({
    example: "pepe@gmail.com",
  })
  readonly email: string
}

export class VerifyEmailResponse {
  @ApiProperty({
    example: "312986"
  })
  readonly code: string
}

export class ResetPasswordResponse extends LoginResponse { }