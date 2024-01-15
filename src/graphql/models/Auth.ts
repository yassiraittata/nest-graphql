import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './User';

@ObjectType()
export class Auth {
  @Field()
  token: string;

  @Field(type => User, { nullable: false })
  user: User;
}
