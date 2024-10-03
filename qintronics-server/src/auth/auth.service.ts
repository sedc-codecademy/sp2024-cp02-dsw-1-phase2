import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { ICurrentUser } from 'src/common/types/current-user.interface';
import { UserInfoService } from 'src/user-info/user-info.service';
import { NoSensitiveUserResponse } from 'src/users/dtos/no-sensitive-user-response.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RefreshTokensResponse } from './dtos/refresh-tokens-response.dto';
import { RegisterDto } from './dtos/register.dto';
import { LogoutDto } from './dtos/logout.dto';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userInfoService: UserInfoService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: RegisterDto): Promise<NoSensitiveUserResponse> {
    const createdUser = await this.usersService.createUser(body);

    return plainToInstance(NoSensitiveUserResponse, createdUser, {
      excludeExtraneousValues: true,
    });
  }

  async login(loggedUser: LoginDto): Promise<LoginResponseDto> {
    const foundUser: User = await this.usersService.getUserByEmail(
      loggedUser.email,
    );

    const validPassword = await bcrypt.compare(
      loggedUser.password,
      foundUser.password,
    );

    if (!validPassword) throw new UnauthorizedException('Invalid credentials.');

    const { cleanUser, accessToken, refreshToken } =
      await this.#createTokensForUser(foundUser);

    return {
      ...cleanUser,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async refreshTokens(refreshToken: string): Promise<RefreshTokensResponse> {
    try {
      const { sub: userId, role } = await this.jwtService.verifyAsync(
        refreshToken,
        { secret: process.env.JWT_REFRESH_SECRET },
      );

      const foundUser = await this.usersService.getUserById(userId);

      if (!foundUser || foundUser.role !== role)
        throw new UnauthorizedException('Invalid token.');

      await this.#validateRefreshTokenForUser(foundUser, refreshToken);

      await this.usersService.removeRefreshToken(foundUser, refreshToken);

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await this.#createTokensForUser(foundUser);

      return {
        newAccessToken,
        newRefreshToken,
      };
    } catch (error) {
      // If verification fails
      throw new UnauthorizedException('Invalid token.');
    }
  }

  async logout({ userId, refreshToken }: LogoutDto): Promise<void> {
    const foundUser = await this.usersService.getUserById(userId);

    if (!foundUser) return;

    await this.usersService.removeRefreshToken(foundUser, refreshToken);
  }

  async #generateTokens(loggedUser: ICurrentUser) {
    const accessToken = await this.jwtService.signAsync(
      { sub: loggedUser.userId, ...loggedUser },
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
        secret: process.env.JWT_ACCESS_SECRET,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { sub: loggedUser.userId, ...loggedUser },
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
        secret: process.env.JWT_REFRESH_SECRET,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async #validateRefreshTokenForUser(user: User, refreshToken) {
    const validToken = user.refreshTokens.includes(refreshToken);

    if (!validToken) throw new UnauthorizedException('Invalid token.');
  }

  async #createTokensForUser(user: User) {
    const cleanUser: ICurrentUser = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const { accessToken, refreshToken } = await this.#generateTokens(cleanUser);

    await this.usersService.saveRefreshToken(user, refreshToken);

    return {
      cleanUser,
      accessToken,
      refreshToken,
    };
  }
}
