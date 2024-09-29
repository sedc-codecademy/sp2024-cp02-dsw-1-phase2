import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ICurrentUser } from 'src/common/types/current-user.interface';
import { NoSensitiveUser } from 'src/users/dtos/no-sensitive-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { RefreshTokensResponse } from './dtos/refresh-tokens-response.dto';
import { LogoutDto } from './dtos/logout.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ description: 'User has been registered.' })
  @ApiBadRequestResponse({ description: 'User already exists.' })
  register(@Body() body: RegisterDto): Promise<NoSensitiveUser> {
    return this.authService.register(body);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User has successfully logged in.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  login(@CurrentUser() loggedUser: ICurrentUser): Promise<LoginResponseDto> {
    return this.authService.login(loggedUser);
  }

  @Post('refresh-tokens')
  @ApiOperation({ summary: `Refresh user's tokens` })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Tokens have been refreshed.',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid token.' })
  refreshTokens(
    @Body() { refreshToken }: RefreshTokenDto,
  ): Promise<RefreshTokensResponse> {
    return this.authService.refreshTokens(refreshToken);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Log out a user' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'User has successfully logged out.',
  })
  logout(@Body() body: LogoutDto): Promise<void> {
    return this.authService.logout(body);
  }
}
