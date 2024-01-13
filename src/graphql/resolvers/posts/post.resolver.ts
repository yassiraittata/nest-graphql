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

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(returns => [Post!]!, { name: 'Posts', nullable: false })
  async getAllPosts() {
    const posts = await this.prisma.post.findMany({
      include: { creator: true },
    });
    return posts;
  }

  @Mutation(returns => Post, { name: 'createPost' })
  async createPost(@Args('postInput') body: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        title: body.title,
        text: body.text,
        userId: '65a2ea587d905c51f8ce3b4e',
      },
      include: {
        creator: true,
      },
    });

    return post;
  }
}
