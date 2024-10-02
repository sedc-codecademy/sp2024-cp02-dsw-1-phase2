import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { NoSensitiveUserResponse } from 'src/users/dtos/no-sensitive-user-response.dto';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dtos/login-response.dto';
import { LoginDto } from './dtos/login.dto';
import { LogoutDto } from './dtos/logout.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { RefreshTokensResponse } from './dtos/refresh-tokens-response.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ description: 'User has been registered.' })
  @ApiBadRequestResponse({ description: 'Invalid body information.' })
  @ApiConflictResponse({ description: 'User already exists.' })
  register(@Body() body: RegisterDto): Promise<NoSensitiveUserResponse> {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User has successfully logged in.',
  })
  @ApiBadRequestResponse({ description: 'Invalid body information.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(body);
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

  @UseGuards(JwtGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Log out a user' })
  @ApiBody({ type: LogoutDto })
  @ApiResponse({
    status: 200,
    description: 'User has successfully logged out.',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid token.' })
  logout(@Body() body: LogoutDto): Promise<void> {
    return this.authService.logout(body);
  }
}
