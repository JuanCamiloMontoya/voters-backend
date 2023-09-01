import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/@common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/@common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/@common/guards/roles.guard';
import { ERole } from 'src/entities/@enums/role.enum';
import { UsersService } from './users.service';
import { User } from 'src/entities/users/user.entity';
import { CreateRecorderDTO } from './dto/create-recorder.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import {
  Error401Options,
  Error500Options,
} from 'src/@common/models/objects/error.object';
import { GetUserResponse } from './response/get-users.response';

@Controller('users')
@ApiTags('Usuarios')
@ApiBearerAuth('defaultBearerAuth')
@ApiUnauthorizedResponse(Error401Options)
@ApiInternalServerErrorResponse(Error500Options)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles(ERole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({
    type: GetUserResponse,
    description: 'Lista de usuarios',
    isArray: true,
  })
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Post('/recorder')
  @Roles(ERole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: User, description: 'Lista de usuarios' })
  async createRecorder(@Body() body: CreateRecorderDTO) {
    return await this.userService.createRecorder(body);
  }

  @Put('/update-password')
  @HttpCode(HttpStatus.ACCEPTED)
  async updatePassword(@Body() body: UpdatePasswordDTO) {
    return await this.userService.updatePassword(body);
  }
}
