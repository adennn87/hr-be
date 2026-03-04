import { Role } from "src/roles/entities/role.entity";
import { Department, Position } from "../entities/user.entity";

export class CreateUserDto {
    fullName: string;

    email: string;

    password: string;

    isActive: boolean;

    phoneNumber: string;

    gender: string;

    dateOfBirth: Date;

    citizen_Id: string;

    department: Department;

    position: Position;

    address: string;

    taxCode: string;

    status: string;

    role: Role;
}
