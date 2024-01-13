import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostDto {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  text: string;

  @Field({ nullable: false })
  userId: string;
}
