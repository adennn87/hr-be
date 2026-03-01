import { RoleFunction } from "src/roles/entities/role_function.entity";

export class CreateFunctionDto {
    code: string;
    name: string;
    description: string;
    roleFunctions: RoleFunction;
}
