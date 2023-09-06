import {
  Length,
  IsEmail,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from "class-validator";

export class UpdatePasswordDTO {
  @IsEmail()
  readonly email: string;

  @Length(3, 30)
  readonly newPassword: string;

  @IsNumber()
  @Min(100000)
  @Max(999999)
  @IsOptional()
  readonly recoverPasswordCode: number;

  @Length(3, 30)
  @IsOptional()
  readonly oldPassword: string;
}
