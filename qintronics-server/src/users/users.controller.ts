import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ICurrentUser } from 'src/common/types/current-user.interface';
import { NoSensitiveUserResponse } from './dtos/no-sensitive-user-response.dto';
import { UserProfileResponse } from './dtos/user-profile-response.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.Admin)
  @Get()
  @ApiOperation({ summary: 'Get all users and their info' })
  @ApiOkResponse({ description: 'All users are retrieved.' })
  @ApiUnauthorizedResponse({
    description: 'User needs to be logged in to access this page.',
  })
  @ApiForbiddenResponse({
    description: 'User does not have permission to access this page.',
  })
  async getAllUsers(): Promise<NoSensitiveUserResponse[]> {
    const users = await this.usersService.getAllUsers();

    return users.map((user) =>
      plainToInstance(NoSensitiveUserResponse, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @Roles(Role.Customer) // Can other roles see their profile, or just customer?
  @Get('me/:id')
  @ApiOperation({ summary: 'Get a user and their info' })
  @ApiOkResponse({ description: 'User has been retrieved.' })
  @ApiBadRequestResponse({ description: 'Invalid route parameter.' })
  @ApiUnauthorizedResponse({
    description: 'User needs to be logged in to access this page.',
  })
  @ApiForbiddenResponse({
    description: 'User does not have permission to access this page.',
  })
  async getUserByProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<UserProfileResponse> {
    const user = await this.usersService.getUserProfile(id, currentUser);

    return plainToInstance(UserProfileResponse, user, {
      excludeExtraneousValues: true,
    });
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 204,
    description: 'User has been deleted.',
  })
  @ApiBadRequestResponse({ description: 'Invalid route parameter.' })
  @ApiUnauthorizedResponse({
    description: 'User needs to be logged in to access this page.',
  })
  @ApiForbiddenResponse({
    description: 'User does not have permission to access this page.',
  })
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @PublicRoute()
  @Post('init-users')
  @ApiOperation({ summary: 'Initialize first users' })
  @ApiCreatedResponse({ description: 'First users have been created.' })
  backfillUsers(): Promise<User[]> {
    return this.usersService.backfillUsers();
  }
}
