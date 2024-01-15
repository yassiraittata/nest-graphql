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
import { Post, UseGuards } from '@nestjs/common';
import { hash } from 'argon2';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser, TUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'User' })
  async getUserById(
    @Args('id', { nullable: false }) id: string,
    @CurrentUser() Curentuser: TUser,
  ) {
    console.log({ sub: Curentuser.userId, email: Curentuser.email });

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
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    const hashedPw = await hash(body.password);

    const user = await this.prisma.user.create({
      data: {
        name: body.name,
        password: hashedPw,
        email: body.email,
      },
      include: { Post: true },
    });

    delete user.password;

    return user;
  }
}
