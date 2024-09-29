import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { ICurrentUser } from 'src/common/types/current-user.interface';
import { UserInfoService } from 'src/user-info/user-info.service';
import { NoSensitiveUser } from 'src/users/dtos/no-sensitive-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RefreshTokensResponse } from './dtos/refresh-tokens-response.dto';
import { RegisterDto } from './dtos/register.dto';
import { LogoutDto } from './dtos/logout.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userInfoService: UserInfoService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: RegisterDto): Promise<NoSensitiveUser> {
    const savedUser = await this.usersService.createUser(body);

    await this.userInfoService.createUserInfo({
      name: body.name,
      userId: savedUser.id,
    });

    const fullUserInfo = await this.usersService.getUserProfile(savedUser.id);

    return plainToInstance(NoSensitiveUser, fullUserInfo);
  }

  async login(loggedUser: ICurrentUser): Promise<LoginResponseDto> {
    const user = await this.usersService.getUserById(loggedUser.userId);

    const { accessToken, refreshToken } =
      await this.#generateTokens(loggedUser);

    await this.usersService.saveRefreshToken(user, refreshToken);

    return {
      ...loggedUser,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async refreshTokens(refreshToken: string): Promise<RefreshTokensResponse> {
    const { sub: userId, role } =
      await this.jwtService.verifyAsync(refreshToken);

    const foundUser = await this.usersService.getUserById(userId);

    if (!foundUser || foundUser.role !== role)
      throw new UnauthorizedException('Invalid token.');

    await this.#validateRefreshTokenForUser(foundUser, refreshToken);

    await this.usersService.removeRefreshToken(foundUser, refreshToken);

    const cleanUser: ICurrentUser = {
      userId: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    };

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await this.#generateTokens(cleanUser);

    await this.usersService.saveRefreshToken(foundUser, newRefreshToken);

    return {
      newAccessToken,
      newRefreshToken,
    };
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
}
