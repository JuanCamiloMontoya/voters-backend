import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { ApiPaginatedResponse } from 'src/@common/decorators/paginate.decorator'
import { Roles } from 'src/@common/decorators/roles.decorator'
import { JwtAuthGuard } from 'src/@common/guards/jwt-auth.guard'
import { RolesGuard } from 'src/@common/guards/roles.guard'
import { PageOptionsDto } from 'src/@common/models/dtos/page-options.dto'
import { Error500Options, Error401Options } from 'src/@common/models/objects/error.object'
import { ERole } from 'src/entities/@enums/role.enum'
import { CreateVoterDTO } from './dto/create-voter.dto'
import { CheckDocumentResponse, CreateVoterResponse } from './response/create-voter.response'
import { GetVoterResponse } from './response/get-voter.response'
import { GetVotersResponse } from './response/get-voters.response'
import { VotersService } from './voters.service'
import { SuccessResponse } from 'src/@common/models/responses/success.response'

@Controller('voters')
@ApiTags('Votantes')
@ApiBearerAuth('defaultBearerAuth')
@ApiUnauthorizedResponse(Error401Options)
@ApiInternalServerErrorResponse(Error500Options)
export class VotersController {
  constructor(
    private readonly votersService: VotersService
  ) { }

  @Post()
  @Roles(ERole.Admin, ERole.Recorder)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: CreateVoterResponse, description: 'Datos del nuevo votante' })
  async createVoter(@Body() body: CreateVoterDTO, @Req() req) {
    return await this.votersService.createVoter(body, req.user?.id)
  }

  @Get('/check-document/:document')
  @Roles(ERole.Admin, ERole.Recorder)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'document', type: String, description: 'Cadena númerica' })
  @ApiOkResponse({ type: CheckDocumentResponse, description: 'Variable de existencia' })
  async checkDocument(@Param('document') document: string) {
    return await this.votersService.checkDocument(document)
  }

  @Get()
  @Roles(ERole.Admin, ERole.Recorder)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse({ type: GetVotersResponse, description: 'Lista de votantes' })
  async getVoters(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.votersService.getVoters(pageOptionsDto)
  }

  @Get('/:id')
  @Roles(ERole.Admin, ERole.Recorder)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, description: 'Id del votante' })
  @ApiOkResponse({ type: GetVoterResponse, description: 'Datos del votante' })
  async getVoterDetail(@Param('id') id: number) {
    return await this.votersService.getVoterDetail(id)
  }

  @Delete('/:id')
  @Roles(ERole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, description: 'Id del votante' })
  @ApiOkResponse({ type: SuccessResponse, description: 'Confirmación de la eliminación' })
  async deleteVoter(@Param('id') id: number) {
    return await this.votersService.deleteVoter(id)
  }
}