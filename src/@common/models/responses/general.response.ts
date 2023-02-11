import { ApiProperty } from "@nestjs/swagger"

export class GeneralResponse {

  @ApiProperty({
    example: 34
  })
  id: number

  @ApiProperty({
    example: 'Xyz'
  })
  name: string

}