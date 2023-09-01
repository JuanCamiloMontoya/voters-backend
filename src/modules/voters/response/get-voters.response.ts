import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetVotersResponse {
  @ApiProperty({
    example: 456,
  })
  id: number;

  @ApiProperty({
    example: 'Pepe Joaquin',
  })
  firstname: string;

  @ApiProperty({
    example: 'Perez Gomez',
  })
  lastname: string;

  @ApiProperty({
    example: '3133169875',
  })
  phone: string;

  @ApiPropertyOptional({
    example: '1112504963',
  })
  document?: string;

  @ApiPropertyOptional({
    example: 'pepe@gmail.com',
  })
  email?: string;
}
