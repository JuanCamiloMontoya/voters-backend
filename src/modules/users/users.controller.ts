import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common"
import { Roles } from "src/@common/decorators/roles.decorator"
import { JwtAuthGuard } from "src/@common/guards/jwt-auth.guard"
import { RolesGuard } from "src/@common/guards/roles.guard"
import { ERole } from "src/entities/@enums/role.enum"
import { UsersService } from "./users.service"
import { CreateRecorderDTO } from "./dto/create-recorder.dto"
import { UpdatePasswordDTO } from "./dto/update-password.dto"

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) { }

  @Get()
  @Roles(ERole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllUsers() {
    return await this.userService.getAllUsers()
  }

  @Post('/recorder')
  @Roles(ERole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async createRecorder(@Body() body: CreateRecorderDTO) {
    return await this.userService.createRecorder(body)
  }

  @Put('/update-password')
  @HttpCode(HttpStatus.ACCEPTED)
  async updatePassword(@Body() body: UpdatePasswordDTO) {
    return await this.userService.updatePassword(body)
  }
}