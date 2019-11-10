import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserInput } from './users.dto';

@Injectable()
export class UsersService {
  users: User[] = [{ id: '1', username: 'jese', password: '1234' }];

  async create(createUserInput: CreateUserInput) {
    const user: User = { ...createUserInput, id: String(new Date().getTime()) };
    this.users.push(user);
    return user;
  }

  async findById(id: string) {
    return this.users.find(u => u.id === id);
  }

  async findByUsername(username: string) {
    return this.users.find(u => u.username === username);
  }

  async findAll() {
    return this.users;
  }
}
