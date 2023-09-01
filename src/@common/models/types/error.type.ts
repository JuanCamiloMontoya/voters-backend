import { ApiProperty } from '@nestjs/swagger';

class ErrorResponse {
  @ApiProperty({
    example: 'Error X',
  })
  message: String;
}

export class Error500Response extends ErrorResponse {
  @ApiProperty({
    example: 500,
    type: Number,
  })
  statusCode: Number;
}

export class Error400Response extends ErrorResponse {
  @ApiProperty({
    example: 400,
    type: Number,
  })
  statusCode: Number;
}
