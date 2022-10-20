import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LoginDTO } from "./dto/login.dto"
import { ResetPasswordDTO, PasswordResetRequestDTO, VerifyEmailDTO } from "./dto/password-reset.dto"

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body)
  }

  @Post('/password-reset-request')
  @HttpCode(HttpStatus.ACCEPTED)
  async passwordResetRequest(@Body() body: PasswordResetRequestDTO) {
    return await this.authService.passwordResetRequest(body)
  }

  @Post('/verify-email')
  @HttpCode(HttpStatus.ACCEPTED)
  async verifyEmail(@Body() body: VerifyEmailDTO) {
    return await this.authService.verifyEmail(body)
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.ACCEPTED)
  async resetPassword(@Body() body: ResetPasswordDTO) {
    return await this.authService.resetPassword(body)
  }
}