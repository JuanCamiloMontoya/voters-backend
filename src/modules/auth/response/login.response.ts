import { ApiProperty } from "@nestjs/swagger"

export class LoginResponse {
  @ApiProperty({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.VtpK7PfW-VWPZK7buUtX7n6YXlos54v-xTURtXQp8rw",
  })
  readonly accessToken: string
}