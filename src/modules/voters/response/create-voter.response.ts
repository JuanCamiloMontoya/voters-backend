import { ApiProperty } from "@nestjs/swagger"
import { CreateVoterDTO } from "../dto/create-voter.dto"

export class CreateVoterResponse extends CreateVoterDTO {

  @ApiProperty({
    example: 456
  })
  id: number
}

export class CheckDocumentResponse {
  @ApiProperty()
  exists: boolean
}