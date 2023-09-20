import { ApiProperty } from "@nestjs/swagger";

export class SendWhatsappResponse {
  @ApiProperty({
    example: true,
  })
  readonly success: boolean;
}
