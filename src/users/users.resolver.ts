import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserInput, GetUserAgrs } from './users.dto';
import { CurrentUser } from '../auth/currentuser.decorator';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(returns => User)
  createUser(@Args('user') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(returns => [User])
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Query(returns => User, { nullable: true })
  async getUser(@Args() args: GetUserAgrs) {
    if (args.id) return this.usersService.findById(args.username);
    if (args.username) return this.usersService.findByUsername(args.username);
    return null;
  }

  @Query(returns => User)
  async getMe(@CurrentUser() user: User) {
    return await this.usersService.findById(user.id);
  }
}
