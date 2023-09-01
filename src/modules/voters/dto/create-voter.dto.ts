import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { EGender } from 'src/entities/@enums/gender.enum';

export class CreateVoterDTO {
  @IsString()
  @Length(3, 30)
  @ApiProperty({
    example: 'Pepe',
    minLength: 3,
    maxLength: 30,
  })
  readonly firstname: string;

  @IsString()
  @Length(3, 30)
  @ApiProperty({
    example: 'Perez',
    minLength: 3,
    maxLength: 30,
  })
  readonly lastname: string;

  @IsNumberString()
  @Length(6, 10)
  @ApiProperty({
    description: 'Cadena numérica',
    example: '1023369852',
    minLength: 7,
    maxLength: 10,
  })
  readonly document: string;

  @Length(10, 10)
  @IsNumberString()
  @ApiProperty({
    description: 'Cadena numérica',
    example: '3124567890',
    minLength: 7,
    maxLength: 12,
  })
  readonly phone: string;

  @IsOptional()
  @IsEnum(EGender, { message: 'Seleccione una opción válida!' })
  @ApiProperty({
    enum: EGender,
    example: EGender.Female,
  })
  readonly gender?: EGender;

  @IsEmail({}, { message: 'Ingrese un correo válido!' })
  @IsOptional()
  @MaxLength(50)
  @ApiPropertyOptional({
    example: 'pepe@gmail.com',
    maxLength: 50,
  })
  readonly email?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: new Date('1995-02-11'),
  })
  readonly birthdate?: Date;

  @IsOptional()
  @ApiPropertyOptional({
    example: 45,
    description: 'Id de la subdivision (Barrio o vereda)',
  })
  readonly subdivision?: number;

  @IsOptional()
  @ApiPropertyOptional({
    example: [45, 12],
    description: `Array de ID's de las ocupaciones`,
    isArray: true,
  })
  readonly occupations?: number[];

  @IsOptional()
  @ApiPropertyOptional({
    example: [45, 12],
    description: `Array de ID's de los hobbies`,
    isArray: true,
  })
  readonly hobbies?: number[];
}
