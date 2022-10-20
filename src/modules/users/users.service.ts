import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common"
import { DataSource, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import * as bcrypt from "bcrypt"
import { Person } from "src/entities/voters/person.entity"
import { User } from "src/entities/user/user.entity"
import { UserRole } from "src/entities/user/user-role.entity"
import { CreateRecorderDTO } from "./dto/create-recorder.dto"
import { UpdatePasswordDTO } from "./dto/update-password.dto"
import { AuthService } from "../auth/auth.service"
import { Role } from "src/entities/user/role.entity"
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private dataSource: DataSource
  ) { }

  async createRecorder(body: CreateRecorderDTO) {
    let newRecorder: User

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {

      const { email, firstname, lastname, document } = body

      const existDocument = await queryRunner.manager.findOne(Person, {})
      if (existDocument)
        throw new HttpException('El número de documento ya existe!', HttpStatus.CONFLICT)

      const existEmail = await queryRunner.manager.findOne(User, { where: { email } })
      if (existEmail)
        throw new HttpException('El correo ya existe!', HttpStatus.CONFLICT)


      const newPerson = await queryRunner.manager.save(Person, body)

      let password = `${firstname.slice(0, 3)}_${lastname.slice(0, 3)}_${document.slice(0, 3)}`
      password = await bcrypt.hash(password, 10)
      newRecorder = await queryRunner.manager.save(User, { email, password, person: newPerson })
      await queryRunner.manager.save(UserRole, { role: { id: 2 }, user: { id: newRecorder.id } })

      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }

    delete newRecorder.password
    return { success: true, detail: newRecorder }
  }

  async getAllUsers() {
    return await this.userRepository.find()
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