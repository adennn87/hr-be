import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Position, User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { createQueryBuilder } from 'typeorm';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(
    department?: string,
    position?: Position,
  ): Promise<User[]> {
    const qb = this.userRepository.createQueryBuilder('user');

    if (department) {
      qb.andWhere('user.department = :department', { department });
    }

    if (position) {
      qb.andWhere('user.position = :position', { position });
    }

    return qb.getMany();
  }

  async getUsersGroupedByDepartment() {
    const users = await this.userRepository.find({
      relations: ['department', 'role'],
    });

    const grouped = users.reduce((acc, user) => {
      const deptName = user.department?.name || 'No Department';

      if (!acc[deptName]) {
        acc[deptName] = [];
      }

      acc[deptName].push(user);

      return acc;
    }, {} as Record<string, any[]>);

    return Object.keys(grouped).map((department) => ({
      department,
      users: grouped[department],
    }));
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['department', 'role'],
    });
  }

  async profile(req: any) {
    const userId = req.userId;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.roleFunctions', 'roleFunctions')
      .leftJoinAndSelect('roleFunctions.function', 'function')
      .where('user.id = :userId', { userId })
      .getOne();

    return user;
  }

  async updateUser(req: any, dto: UpdateUserDto) {
  const user = await this.userRepository.findOne({
    where: { id: req.userId },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  Object.assign(user, dto);

  return this.userRepository.save(user);
}
}
