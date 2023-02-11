import { ApiProperty } from "@nestjs/swagger"
import { GeneralResponse } from "src/@common/models/responses/general.response"
import { EDivision, ESubdivision } from "src/entities/@enums/division.enum"

export class GetDivisionsResponse extends GeneralResponse {

  @ApiProperty({
    enum: EDivision,
    example: EDivision.Commune
  })
  type: EDivision

}

export class GetSubdivisionsResponse extends GeneralResponse {

  @ApiProperty({
    enum: ESubdivision,
    example: ESubdivision.Neighborhood
  })
  type: ESubdivision

}

export class GetFullSubdivisionsResponse extends GeneralResponse { }