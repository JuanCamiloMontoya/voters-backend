import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Roles } from "src/@common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/@common/guards/jwt-auth.guard";
import { RolesGuard } from "src/@common/guards/roles.guard";
import {
  Error401Options,
  Error500Options,
} from "src/@common/models/objects/error.object";
import { ERole } from "src/entities/@enums/role.enum";
import { GetDivisionsAndSubdivisonsDTO as GetFullSubdivisonsDTO } from "./dto/get-devisions.dto";
import { GeneralService } from "./general.service";
import {
  GetDivisionsResponse,
  GetFullSubdivisionsResponse,
  GetSubdivisionsResponse,
} from "./response/get-devisions.response";
import { GetHobbiesResponse } from "./response/get-hobbies.response";
import { GetOccupationsResponse } from "./response/get-occupations.response";

@Controller("general")
@ApiTags("Geografía")
@ApiBearerAuth("defaultBearerAuth")
@ApiUnauthorizedResponse(Error401Options)
@ApiInternalServerErrorResponse(Error500Options)
export class GeneralController {
  constructor(private generalService: GeneralService) {}

  @Get("/divisions")
  @Roles(ERole.Admin, ERole.Recorder)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({
    type: GetDivisionsResponse,
    description: "Lista de divisiones",
    isArray: true,
  })
  async getDivisions() {
    return await this.generalService.getDivisions();
  }

  @Get("/subdivisions/:divisionId")
  @Roles(ERole.Admin, ERole.Recorder)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({
    type: GetSubdivisionsResponse,
    description: "Lista de subdivisiones por división",
    isArray: true,
  })
  async getSubdivisions(@Param("divisionId", ParseIntPipe) divisionId: number) {
    return await this.generalService.getSubdivisions(divisionId);
  }

  @Get("/full-subdivisions")
  @Roles(ERole.Admin, ERole.Recorder)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({
    type: GetFullSubdivisionsResponse,
    description: "Lista de divisiones con subdivisiones",
    isArray: true,
  })
  @ApiQuery({
    name: "name",
    type: String,
    description: "Nombre del barrio o vereda",
    required: false,
  })
  async getFullSubdivisions(@Query() { name }: GetFullSubdivisonsDTO) {
    return await this.generalService.getFullSubdivisions(name);
  }

  @Get("/full-subdivision/:subdivisionId")
  @Roles(ERole.Admin, ERole.Recorder)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({
    type: GetFullSubdivisionsResponse,
    description: "División con subdivisión",
  })
  async getFullSubdivision(@Param("subdivisionId", ParseIntPipe) subdivisionId: number) {
    return await this.generalService.getFullSubdivision(subdivisionId);
  }

  @Get("/hobbies")
  @Roles(ERole.Admin, ERole.Recorder)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({
    type: GetHobbiesResponse,
    description: "Lista de pasatiempos",
    isArray: true,
  })
  async getHobbies() {
    return await this.generalService.getHobbies();
  }

  @Get("/occupations")
  @Roles(ERole.Admin, ERole.Recorder)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({
    type: GetOccupationsResponse,
    description: "Lista de ocupaciones",
    isArray: true,
  })
  async getOccupations() {
    return await this.generalService.getOccupations();
  }
}
