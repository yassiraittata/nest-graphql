import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser, TUser } from '../auth/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/auth.guard';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly prisma: PrismaService) {}

  // Resolve Creator
  @ResolveField()
  async creator(@Parent() post: Post, @CurrentUser() currentUser: TUser) {
    const user = await this.prisma.user.findUnique({
      where: { id: currentUser.userId },
    });

    return user;
  }

  @Query(() => [Post!]!, { name: 'Posts', nullable: false })
  async getAllPosts() {
    const posts = await this.prisma.post.findMany({});
    return posts;
  }

  // return user's posts
  @UseGuards(GqlAuthGuard)
  @Query(() => [Post], { nullable: false, name: 'UsersPost' })
  async postsPerUser(@CurrentUser() currentUser: TUser) {
    const posts = await this.prisma.post.findMany({
      where: {
        userId: currentUser.userId,
      },
    });

    return posts;
  }

  // create post
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post, { name: 'createPost' })
  async createPost(
    @Args('postInput') body: CreatePostDto,
    @CurrentUser() currentUser: TUser,
  ) {
    const post = await this.prisma.post.create({
      data: {
        title: body.title,
        text: body.text,
        userId: currentUser.userId,
      },
      include: {
        creator: true,
      },
    });

    return post;
  }
}
