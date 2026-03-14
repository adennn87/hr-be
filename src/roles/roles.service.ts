import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { RoleFunction } from './entities/role_function.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Function_permission } from 'src/function/entities/function.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,

    @InjectRepository(RoleFunction)
    private roleFunctionRepo: Repository<RoleFunction>,

    @InjectRepository(Function_permission)
    private functionRepo: Repository<Function_permission>,
  ) {}

  async create(dto: CreateRoleDto) {
    const role = this.roleRepo.create({
      name: dto.name,
      description: dto.description,
    });

    const savedRole = await this.roleRepo.save(role);

    if (dto.functionIds?.length) {
      const functions = await this.functionRepo.find({
        where: { id: In(dto.functionIds) },
      });

      const roleFunctions = functions.map((f) =>
        this.roleFunctionRepo.create({
          role: savedRole,
          function: f,
        }),
      );

      await this.roleFunctionRepo.save(roleFunctions);
    }
    return savedRole;
  }

  async findAll() {
    return this.roleRepo.find({
      relations: {
        roleFunctions: {
          function: true,
        },
      },
    });
  }

  async findOne(id: string) {
    return this.roleRepo.findOne({
      where: { id },
      relations: {
        roleFunctions: {
          function: true,
        },
      },
    });
  }

  async update(id: string, dto: UpdateRoleDto) {
    const role = await this.roleRepo.findOne({ where: { id } });

    if (!role) throw new Error("Role not found");

    role.name = dto.name ?? role.name;
    role.description = dto.description ?? role.description;

    await this.roleRepo.save(role);

    if (dto.functionIds) {
      await this.roleFunctionRepo.delete({ role: { id } });

      const functions = await this.functionRepo.find({
        where: { id: In(dto.functionIds) },
      });

      const roleFunctions = functions.map((f) =>
        this.roleFunctionRepo.create({
          role,
          function: f,
        }),
      );

      await this.roleFunctionRepo.save(roleFunctions);
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    return this.roleRepo.delete(id);
  }
}