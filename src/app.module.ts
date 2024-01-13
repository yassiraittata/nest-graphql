import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './graphql/resolvers/users/user.resolver';
import { PostResolver } from './graphql/resolvers/posts/post.resolver';
import { PrimsaModule } from './prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/shcema.gql',
      context: {
        userId: '1',
      },
    }),
    PrimsaModule,
  ],
  controllers: [],
  providers: [UserResolver, PostResolver],
})
export class AppModule {}
