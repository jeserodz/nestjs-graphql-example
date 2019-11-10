import { ArgsType, Field, ObjectType } from 'type-graphql';

@ArgsType()
export class LoginArgs {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class AccessToken {
  @Field()
  token: string;
}
