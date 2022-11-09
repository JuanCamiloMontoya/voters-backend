import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import * as bcrypt from "bcrypt"
import { Template } from "src/@common/services/sendgrid/template.constant"
import { SendgridService } from "src/@common/services/sendgrid/sendgrid.service"
import { User } from "src/entities/users/user.entity"
import { UsersService } from "../users/users.service"
import { LoginDTO } from "./dto/login.dto"
import {
  PasswordResetRequestDTO,
  ResetPasswordDTO,
  VerifyEmailDTO
} from "./dto/password-reset.dto"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly sengridService: SendgridService
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email)
    const isMatch = user && await bcrypt.compare(password, user.password)
    if (isMatch) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(body: LoginDTO) {
    const { email, password } = body
    const user = await this.validateUser(email, password)

    if (!user)
      throw new HttpException('Credenciales incorrectas!', HttpStatus.UNAUTHORIZED)

    return { accessToken: this.jwtService.sign(user) }
  }

  async passwordResetRequest(body: PasswordResetRequestDTO) {
    try {
      const { email } = body
      const user = await this.userService.getUserByEmail(email)
      if (!user)
        throw new HttpException('Usuario no encontrado!', HttpStatus.NOT_FOUND)

      const passwordResetCode = Math.floor(100000 + Math.random() * 900000).toString()
      const encrytedCode = await bcrypt.hash(passwordResetCode, 10)
      const passwordResetExpiration = new Date(new Date().getTime() + 16 * 60000)

      await this.userRepository.update(
        { email },
        { passwordResetCode: encrytedCode, passwordResetExpiration }
      )

      await this.sengridService.sendEmail(
        email,
        Template.RECOVER_PASSWORD,
        { passwordResetCode }
      )

      return { email }

    } catch (error) {
      throw new HttpException(
        error?.response?.toString() || error?.toString(),
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async verifyEmail(body: VerifyEmailDTO) {
    try {

      const { code, email } = body
      const user = await this.userRepository.findOne({
        select: ['passwordResetCode', 'passwordResetExpiration'],
        where: { email }
      })
      const isMatch = user && await bcrypt.compare(code, user.passwordResetCode)

      if (!isMatch)
        throw new HttpException(
          'Código no válido! Compruebe el código e intentelo de nuevo.',
          HttpStatus.NOT_ACCEPTABLE
        )

      if (new Date() > user.passwordResetExpiration)
        throw new HttpException(
          'El código ya expiró! Solicite el código nuevamente.',
          HttpStatus.NOT_ACCEPTABLE
        )

      let passwordResetCode = Math.floor(100000 + Math.random() * 900000).toString()
      const encrytedCode = await bcrypt.hash(passwordResetCode, 10)

      await this.userRepository.update({ email }, { passwordResetCode: encrytedCode })

      return { code: passwordResetCode }
    } catch (error) {
      throw new HttpException(
        error?.response?.toString() || error?.toString(),
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async resetPassword(body: ResetPasswordDTO) {
    try {
      let { email, code, password } = body

      const user = await this.userRepository.findOne({
        select: ['passwordResetCode', 'passwordResetExpiration'],
        where: { email }
      })
      const isMatch = user && await bcrypt.compare(code, user.passwordResetCode)

      if (!isMatch)
        throw new HttpException('Los datos suministrados son incorrectos!', HttpStatus.NOT_ACCEPTABLE)

      const encrytedPassword = await bcrypt.hash(password, 10)
      await this.userRepository.update({ email }, {
        password: encrytedPassword,
        passwordResetCode: null,
        passwordResetExpiration: null
      })

      return this.login({ email, password })
    } catch (error) {
      throw new HttpException(
        error?.response?.toString() || error?.toString(),
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}