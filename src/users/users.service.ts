import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Position, User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/browser/repository/Repository.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): string {
    return 'This action adds a new user';
  }

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
}
