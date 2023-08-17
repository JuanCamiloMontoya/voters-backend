import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator"

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC, description: 'Ordenar' })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC

  @ApiPropertyOptional({ minimum: 1, default: 1, description: 'Página' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly current?: number = 1

  @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 10, description: 'Cantidad' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly pageSize?: number = 10

  get skip(): number {
    return (this.current - 1) * this.pageSize
  }
}