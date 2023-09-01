import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class GetDivisionsAndSubdivisonsDTO {
  @ApiProperty({
    example: 'Vergel',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;
}
