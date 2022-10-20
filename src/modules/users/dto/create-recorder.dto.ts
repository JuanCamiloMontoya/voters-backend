import { IsEmail, IsNumberString, IsString, Length } from "class-validator"

export class CreateRecorderDTO {

  @IsEmail()
  email: string

  @IsString()
  @Length(3, 30)
  firstname: string

  @IsString()
  @Length(3, 30)
  lastname: string

  @IsNumberString()
  @Length(7, 20)
  document: string

  @Length(7, 13)
  @IsNumberString()
  phone: string

}