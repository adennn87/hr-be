import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto): string {
    return 'This action adds a new user';
  }

  findAll(): string {
    return `This action returns all users`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} user`;
  }

  findOneByEmail(email: string): Promise<User | null> {
    // TODO: Implement this to query database by email
    return Promise.resolve(null);
  }

  findForLogin(email: string): Promise<User | null> {
    // TODO: Implement this to query database for login
    return Promise.resolve(null);
  }

  update(id: number, updateUserDto: UpdateUserDto): string {
    return `This action updates a #${id} user`;
  }

  remove(id: number): string {
    return `This action removes a #${id} user`;
  }
}
