import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get('public', ctx.getHandler());

    if (isPublic) return true;

    const allowedRoles = this.reflector.getAllAndOverride('roles', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!allowedRoles) return true;

    const userRole = ctx.switchToHttp().getRequest().user.role;

    return allowedRoles.includes(userRole);
  }
}
