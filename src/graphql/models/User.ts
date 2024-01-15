import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from './Post';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  email: string;

  // @Field({ nullable: true })
  // password: string;

  @Field(type => [Post!]!)
  posts?: Post[];
}
