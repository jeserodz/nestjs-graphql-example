import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) throw new Error('User not found');

    if (user.password !== password) throw new Error('Invalid credentials');

    return {
      token: this.jwtService.sign({
        userId: user.id,
        username: user.username,
      }),
    };
  }
}
