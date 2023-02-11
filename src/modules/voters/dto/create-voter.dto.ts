import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsNumberString, IsOptional, IsString, Length, MaxLength } from "class-validator"

export class CreateVoterDTO {

  @IsString()
  @Length(3, 30)
  @ApiProperty({
    example: 'Pepe',
    minLength: 3,
    maxLength: 30
  })
  readonly firstname: string

  @IsString()
  @Length(3, 30)
  @ApiProperty({
    example: 'Perez',
    minLength: 3,
    maxLength: 30
  })
  readonly lastname: string

  @IsNumberString()
  @Length(6, 10)
  @ApiProperty({
    description: "Cadena numérica",
    example: '1023369852',
    minLength: 7,
    maxLength: 10
  })
  readonly document: string

  @Length(10, 10)
  @IsNumberString()
  @ApiProperty({
    description: "Cadena numérica",
    example: '3124567890',
    minLength: 7,
    maxLength: 12
  })
  readonly phone: string

  @IsEmail()
  @IsOptional()
  @MaxLength(50)
  @ApiPropertyOptional({
    example: 'pepe@gmail.com',
    maxLength: 50
  })
  readonly email?: string

  @IsOptional()
  @ApiPropertyOptional({
    example: 45,
    description: 'Id de la subdivision (Barrio o vereda)'
  })
  readonly subdivisionId?: number

  @IsOptional()
  @ApiPropertyOptional({
    example: 45,
    description: `Array de ID's de las ocupasiones`,
    isArray: true
  })
  readonly occupations?: number[]


  @IsOptional()
  @ApiPropertyOptional({
    example: 45,
    description: `Array de ID's de los hobbies`,
    isArray: true
  })
  readonly hobbies?: number[]

}