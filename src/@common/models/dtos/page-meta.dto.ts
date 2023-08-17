import { ApiProperty } from "@nestjs/swagger"
import { PageOptionsDto } from "./page-options.dto"

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto
  total: number
}

export class PageMetaDto {
  @ApiProperty()
  readonly current: number

  @ApiProperty()
  readonly pageSize: number

  @ApiProperty()
  readonly total: number

  @ApiProperty()
  readonly pageCount: number

  @ApiProperty()
  readonly hasPreviousPage: boolean

  @ApiProperty()
  readonly hasNextPage: boolean

  constructor({ pageOptionsDto, total }: PageMetaDtoParameters) {
    this.current = pageOptionsDto.current
    this.pageSize = pageOptionsDto.pageSize
    this.total = total
    this.pageCount = Math.ceil(this.total / this.pageSize)
    this.hasPreviousPage = this.current > 1
    this.hasNextPage = this.current < this.pageCount
  }
}