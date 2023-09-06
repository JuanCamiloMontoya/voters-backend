import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GeneralResponse } from "src/@common/models/responses/general.response";
import { EDivision, ESubdivision } from "src/entities/@enums/division.enum";
import { Hobby } from "src/entities/voters/hobby.entity";
import { Occupation } from "src/entities/voters/occupation.entity";

class Division extends GeneralResponse {
  @ApiPropertyOptional({
    enum: EDivision,
  })
  type: EDivision;
}

class Subdivision extends GeneralResponse {
  @ApiPropertyOptional({
    enum: ESubdivision,
  })
  type: ESubdivision;

  @ApiPropertyOptional({
    type: Division,
  })
  division: Division;
}

export class GetVoterResponse {
  @ApiProperty({
    example: 456,
  })
  id: number;

  @ApiProperty({
    example: "Pepe Joaquin",
  })
  firstname: string;

  @ApiProperty({
    example: "Perez Gomez",
  })
  lastname: string;

  @ApiProperty({
    example: "3133169875",
  })
  phone: string;

  @ApiPropertyOptional({
    example: "1112504963",
  })
  document?: string;

  @ApiPropertyOptional({
    example: "pepe@gmail.com",
  })
  email?: string;

  @ApiPropertyOptional({
    example: "18-01-1999",
  })
  birthdate?: string;

  @ApiPropertyOptional({
    type: GeneralResponse,
  })
  hobbies: Hobby[];

  @ApiPropertyOptional({
    type: GeneralResponse,
  })
  occupations: Occupation[];

  @ApiPropertyOptional({
    type: Subdivision,
  })
  subdivision: number;
}
