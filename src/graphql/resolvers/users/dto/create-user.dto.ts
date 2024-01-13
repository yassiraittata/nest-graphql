import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

// @ArgsType()
// export class CreateUserDto {}

@InputType()
export class CreateUserDto {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @MinLength(6)
  password: string;
}
