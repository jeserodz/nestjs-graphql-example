import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Post {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  username: string;
}
