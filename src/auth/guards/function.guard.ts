import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRE_FUNCTION_KEY } from '../decorators/require-function.decorator';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { RoleFunction } from 'src/roles/entities/role_function.entity';


@Injectable()
export class FunctionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,

        // @InjectRepository(RoleFunction)
        // private roleFunctionRepo: Repository<RoleFunction>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const functionName = this.reflector.getAllAndOverride<string>(
            REQUIRE_FUNCTION_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!functionName) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new ForbiddenException('Unauthorized');
        }

        const hasPermission = user.permissions?.includes(functionName);

        if (!hasPermission) {
            throw new ForbiddenException('Bạn không có quyền truy cập');
        }

        return true;
    }
}