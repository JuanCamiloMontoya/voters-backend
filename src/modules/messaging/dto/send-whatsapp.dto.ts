import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, Length } from "class-validator";

export class SendWhatsappDTO {
  @ApiProperty({
    example: "Lorem ipsum dolor sit amet...",
  })
  @Length(1, 65536, { message: "Deben ser entre 1 y 65536 carácteres!" })
  @IsString()
  text: string;

  @ApiProperty({ type: "array", items: { type: "string", format: "binary" } })
  files: any[];
}
