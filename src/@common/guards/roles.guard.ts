import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { ERole } from "src/entities/@enums/role.enum"
import { UsersService } from "src/modules/users/users.service"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<ERole[]>('roles', context.getHandler())

    if (!roles)
      return true

    const { user } = context.switchToHttp().getRequest()

    const userRoles = await this.usersService.getUserRoles(user.id)

    const hasRole: boolean = userRoles?.some((({ key }) => roles.includes(key)))

    return hasRole
  }
}