import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { ApiPaginatedResponse } from 'src/@common/decorators/paginate.decorator'
import { Roles } from 'src/@common/decorators/roles.decorator'
import { JwtAuthGuard } from 'src/@common/guards/jwt-auth.guard'
import { RolesGuard } from 'src/@common/guards/roles.guard'
import { PageOptionsDto } from 'src/@common/models/dtos/page-options.dto'
import { Error500Options, Error401Options } from 'src/@common/models/objects/error.objects'
import { ERole } from 'src/entities/@enums/role.enum'
import { CreateVoterDTO } from './dto/create-voter.dto'
import { CreateVoterResponse } from './response/create-voter.response'
import { GetVoterResponse } from './response/get-voters.response'
import { VotersService } from './voters.service'

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
  async createVoter(@Body() body: CreateVoterDTO) {
    return await this.votersService.createVoter(body)
  }

  @Get()
  @Roles(ERole.Admin, ERole.Recorder)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse({ type: GetVoterResponse, description: 'Lista de votantes' })
  async getVoters(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.votersService.getVoters(pageOptionsDto)
  }
}