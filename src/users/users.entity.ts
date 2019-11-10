import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field(type => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
