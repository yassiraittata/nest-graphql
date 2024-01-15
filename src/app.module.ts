import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './graphql/resolvers/users/user.resolver';
import { PostResolver } from './graphql/resolvers/posts/post.resolver';
import { PrimsaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './graphql/resolvers/auth/auth.resolver';
import { ConfigModule } from '@nestjs/config';
import { GqlAuthGuard } from './graphql/resolvers/auth/guards/auth.guard';
import { JwtStrategy } from './graphql/resolvers/auth/startegy/jwt.strategy';

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
    JwtModule.register({}),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [
    UserResolver,
    PostResolver,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
  ],
})
export class AppModule {}
