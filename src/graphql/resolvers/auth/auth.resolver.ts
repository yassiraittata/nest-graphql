import { BadRequestException } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Auth } from 'src/graphql/models/Auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  @Query(() => Auth)
  async signin(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new BadRequestException('No user was found!');

    const isPwMatch = await verify(user.password, password);

    if (!isPwMatch) throw new BadRequestException('Incorrect password!');

    const payload = { email: user.email, sub: user.id };
    const token = this.jwt.sign(payload, {
      secret: this.config.get('SECRET'),
    });

    delete user.password;

    return {
      token,
      user,
    };
  }
}
