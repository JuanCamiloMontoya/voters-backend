import { SetMetadata } from '@nestjs/common';
import { ERole } from 'src/entities/@enums/role.enum';

export const Roles = (...roles: ERole[]) => SetMetadata('roles', roles);
