import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ICurrentUser } from 'src/common/types/current-user.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ICurrentUser => {
    const request = ctx.switchToHttp().getRequest();

    // Extract the user object from the request, placed by the local or JWT strategy
    return request.user;
  },
);
