import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { ICurrentUser } from 'src/common/types/current-user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<ICurrentUser> {
    const foundUser: User = await this.usersService.getUserByEmail(email);

    const validPassword = await bcrypt.compare(password, foundUser.password);

    if (!validPassword) throw new UnauthorizedException('Invalid credentials.');

    // Appended to the request as a user property
    return {
      userId: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    };
  }
}
