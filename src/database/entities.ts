import { User } from '../users/entities/user.entity';
import { Otp } from '../auth/entities/otp.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RoleFunction } from 'src/roles/entities/role_function.entity';
import { Function } from 'src/function/entities/function.entity';

export const entities = [User, Otp, Function, Role, RoleFunction]; 