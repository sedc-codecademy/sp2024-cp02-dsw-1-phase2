import { Reflector } from '@nestjs/core';

// Create the decorator which will inform which roles are allowed access to the route
export const Roles = Reflector.createDecorator<string[]>();
