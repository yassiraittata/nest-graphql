import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export type TUser = {
  userId: string;
  email: string;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): TUser => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
