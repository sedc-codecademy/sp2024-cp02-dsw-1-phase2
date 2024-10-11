import { SetMetadata } from '@nestjs/common';

// Create the decorator which will inform which roles are allowed access to the route
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
