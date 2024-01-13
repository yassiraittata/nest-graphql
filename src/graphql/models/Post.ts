import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './User';

@ObjectType()
export class Post {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  text: string;

  @Field(type => User, { nullable: false })
  creator: User;
}
