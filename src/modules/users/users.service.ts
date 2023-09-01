import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common"
import { DataSource, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { sampleSize } from 'lodash'
import * as bcrypt from "bcrypt"
import { Person } from "src/entities/voters/person.entity"
import { User } from "src/entities/users/user.entity"
import { UserRole } from "src/entities/users/user-role.entity"
import { CreateRecorderDTO } from "./dto/create-recorder.dto"
import { UpdatePasswordDTO } from "./dto/update-password.dto"
import { AuthService } from "../auth/auth.service"
import { Role } from "src/entities/users/role.entity"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private dataSource: DataSource
  ) { }

  async createRecorder(recorder: CreateRecorderDTO) {
    let newRecorder: User

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const { email, document } = recorder

      const { manager } = queryRunner

      const existDocument = await manager.findOneBy(Person, { document })
      if (existDocument)
        throw new HttpException('El número de documento ya existe!', HttpStatus.CONFLICT)

      const existEmail = await manager.findOneBy(User, { email })
      if (existEmail)
        throw new HttpException('El correo ya existe!', HttpStatus.CONFLICT)


      const newPerson = await manager.save(Person, recorder)

      let password = sampleSize(
        'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789!@#$%\-+&_*', 10
      ).join('')

      password = await bcrypt.hash(password, 10)
      newRecorder = await manager.save(User, { email, password, person: newPerson })
      await manager.save(UserRole, { role: { id: 2 }, user: { id: newRecorder.id } })

      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new HttpException(
        error.response?.toString() || error.toString(),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    } finally {
      await queryRunner.release()
    }

    delete newRecorder.password
    return newRecorder
  }

  async getAllUsers() {
    return await this.userRepository.find({ select: ['id', "email", "state"] })
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.password'])
      .where('user.email = :email', { email })
      .getOne()
  }

  async getUserRoles(userId: number) {
    return await this.roleRepository.createQueryBuilder('role')
      .select('role.key')
      .innerJoin('role.users', 'userRole', 'userRole.fk_user = :userId', { userId })
      .getMany()
  }

  async updatePassword(body: UpdatePasswordDTO) {
    try {
      let { email, newPassword, oldPassword } = body

      const user = await this.authService.validateUser(email, oldPassword)

      if (!user)
        throw new HttpException('Los datos suministrados son incorrectos!', HttpStatus.NOT_ACCEPTABLE)

      newPassword = await bcrypt.hash(newPassword, 10)
      await this.userRepository.update({ email }, { password: newPassword })

      return { success: true }
    } catch (error) {
      throw new HttpException(
        error.response.toString() || error.toString(),
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}