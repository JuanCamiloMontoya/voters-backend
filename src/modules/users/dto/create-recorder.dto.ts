import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumberString, IsString, Length } from "class-validator";

export class CreateRecorderDTO {
  @IsEmail()
  @ApiProperty({
    example: "pepe@gmail.com",
  })
  readonly email: string;

  @IsString()
  @Length(3, 30)
  @ApiProperty({
    example: "Pepe",
  })
  readonly firstname: string;

  @IsString()
  @Length(3, 30)
  @ApiProperty({
    example: "Perez",
  })
  readonly lastname: string;

  @IsNumberString()
  @Length(7, 20)
  @ApiProperty({
    example: "1023369852",
  })
  readonly document: string;

  @Length(7, 13)
  @IsNumberString()
  @ApiProperty({
    example: "3124567890",
  })
  readonly phone: string;
}
