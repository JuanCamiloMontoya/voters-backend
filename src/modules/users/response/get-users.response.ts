import { ApiProperty } from "@nestjs/swagger"

export class GetUserResponse {

  @ApiProperty()
  readonly id: number

  @ApiProperty()
  readonly email: string

  @ApiProperty()
  readonly state: string

}