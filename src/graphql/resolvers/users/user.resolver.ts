import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../../models/User';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(returns => User, { name: 'User' })
  async getUserById(@Args('id', { nullable: false }) id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      include: { Post: true },
    });

    return user;
  }

  // @Query(returns => [User!]!, { nullable: false, name: 'Users' })
  // getUsers() {
  //   return [
  //     {
  //       id: '1',
  //       name: 'yassir',
  //       email: 'email@email.com',
  //       password: '123456',
  //       posts: [],
  //     },
  //   ];
  // }

  // Resolve posts
  @ResolveField(returns => Post)
  async posts(@Parent() creator: User) {
    const posts = await this.prisma.post.findMany({
      where: {
        userId: '65a2ea587d905c51f8ce3b4e',
      },
    });

    return posts;
  }

  @Mutation(returns => User)
  async createUser(
    @Args('createUserInput') body: CreateUserDto,
    @Context('userId') userId: string,
  ) {
    const user = await this.prisma.user.create({
      data: {
        name: body.name,
        password: body.password,
        email: body.email,
      },
      include: { Post: true },
    });

    return user;
  }
}
