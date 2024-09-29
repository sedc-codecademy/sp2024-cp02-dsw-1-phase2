import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NoSensitiveUserInfo } from './dtos/no-sensitive-user-info.dto';
import { UpdateUserInfoDto } from './dtos/update-user-info.dto';
import { UserInfo } from './user-info.entity';
import { UserInfoService } from './user-info.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidUnknownValues: true,
  }),
)
@Controller('user-info')
@ApiTags('User Info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles([Role.Admin, Role.DeliveryPerson, Role.Customer]) // Can other roles see their profile info, or just customer?
  @Put(':userId') // userId will be found from token??
  @ApiParam({
    type: String,
    name: 'userId',
    description: 'User ID',
    example: '991ecd9f-e438-4e56-9231-c68510d31b37',
  })
  @ApiBody({ type: UpdateUserInfoDto })
  @ApiResponse({
    status: 200,
    type: NoSensitiveUserInfo,
    description: 'The info of the user with the requested ID is updated',
  })
  @ApiNotFoundResponse({ description: 'User does not exist!' })
  async updateUserInfo(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() body: UpdateUserInfoDto,
  ): Promise<NoSensitiveUserInfo> {
    return this.userInfoService.updateUserInfo(userId, body);
  }

  @Post('init-customer-info')
  @ApiOperation({ summary: 'Initialize customer info' })
  @ApiCreatedResponse({ description: 'Customer info has been created.' })
  backfillCustomerInfo(): Promise<UserInfo> {
    return this.userInfoService.backfillCustomerInfo();
  }
}
