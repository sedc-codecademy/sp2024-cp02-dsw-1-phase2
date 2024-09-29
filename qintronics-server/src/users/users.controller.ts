import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { NoSensitiveUser } from './dtos/no-sensitive-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles([Role.Admin])
  @Get()
  @ApiOperation({ summary: 'Get all users and their info' })
  @ApiOkResponse({ description: 'All users are retrieved.' })
  async getAllUsers(): Promise<NoSensitiveUser[]> {
    const users = await this.usersService.getAllUsers();

    return users.map((user) =>
      plainToInstance(NoSensitiveUser, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles([Role.Admin, Role.DeliveryPerson, Role.Customer]) // Can other roles see their profile, or just customer?
  @Get('me/:id')
  @ApiOperation({ summary: 'Get a user and their info' })
  @ApiOkResponse({ description: 'User has been retrieved.' })
  @ApiNotFoundResponse({ description: 'User does not exist.' })
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserProfile(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles([Role.Admin])
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiOkResponse({ description: 'User has been deleted.' })
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @Post('init-users')
  @ApiOperation({ summary: 'Initialize first users' })
  @ApiCreatedResponse({ description: 'First users have been created.' })
  backfillUsers(): Promise<User[]> {
    return this.usersService.backfillUsers();
  }
}
