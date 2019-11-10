import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginArgs, AccessToken } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(returns => AccessToken, { nullable: true })
  async login(@Args() args: LoginArgs) {
    const token = await this.authService.login(args.username, args.password);
    return token;
  }
}
