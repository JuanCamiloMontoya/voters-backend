import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import {
  ApiAcceptedResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { LoginDTO } from "./dto/login.dto"
import { LoginResponse } from "./response/login.response"
import {
  ResetPasswordDTO,
  PasswordResetRequestDTO,
  VerifyEmailDTO
} from "./dto/password-reset.dto"
import { Error400Response } from "src/@common/models/types/error.types"
import { Error500Options } from "src/@common/models/objects/error.objects"
import {
  PasswordResetRequestResponse,
  ResetPasswordResponse,
  VerifyEmailResponse
} from "./response/password-reset.response"

@Controller('auth')
@ApiTags('Autenticación')
@ApiInternalServerErrorResponse(Error500Options)
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginResponse, description: 'Login exitoso' })
  @ApiUnauthorizedResponse({ type: Error400Response, description: 'Login no exitoso' })
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body)
  }

  @Post('/password-reset-request')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({ type: PasswordResetRequestResponse, description: 'Solicitud aceptada' })
  @ApiNotFoundResponse({ type: Error400Response, description: 'Usuario no encontrado' })
  async passwordResetRequest(@Body() body: PasswordResetRequestDTO) {
    return await this.authService.passwordResetRequest(body)
  }

  @Post('/verify-email')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({ type: VerifyEmailResponse, description: 'Solicitud aceptada' })
  @ApiNotAcceptableResponse({ type: Error400Response, description: 'Codigo inválido' })
  async verifyEmail(@Body() body: VerifyEmailDTO) {
    return await this.authService.verifyEmail(body)
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({ type: ResetPasswordResponse, description: 'Contraseña actualizada' })
  @ApiNotAcceptableResponse({ type: Error400Response, description: 'Datos incorrectos' })
  async resetPassword(@Body() body: ResetPasswordDTO) {
    return await this.authService.resetPassword(body)
  }
}