import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsNumberString, IsOptional, IsString } from "class-validator"

export class CreateVoterDTO {

  @IsString()
  @ApiProperty({
    example: 'Pepe Joaquin'
  })
  firstname: string

  @IsString()
  @ApiProperty({
    example: 'Perez Gomez'
  })
  lastname: string

  @IsString()
  @ApiProperty({
    example: '3133169875'
  })
  phone: string

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '1112504963'
  })
  document?: string

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'pepe@gmail.com'
  })
  email?: string

}