import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { NoSensitiveUserInfoResponse } from './dtos/no-sensitive-user-info.dto';
import { UpdateUserInfoDto } from './dtos/update-user-info.dto';
import { UserInfoService } from './user-info.service';

@UseGuards(JwtGuard, RolesGuard)
@Controller('user-info')
@ApiTags('User Info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Roles([Role.Admin, Role.DeliveryPerson, Role.Customer]) // Can other roles see their profile info, or just customer?
  @Put(':id') // When accessing /me page, all user info will be sent, including the user info ID, so the front end can send it as a route param
  @ApiParam({
    type: String,
    name: 'id',
    description: 'User Info ID',
    example: '991ecd9f-e438-4e56-9231-c68510d31b37',
  })
  @ApiBody({ type: UpdateUserInfoDto })
  @ApiOkResponse({
    type: NoSensitiveUserInfoResponse,
    description: 'User has been updated.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid route parameter or invalid body information.',
  })
  @ApiUnauthorizedResponse({
    description: 'User needs to be logged in to access this page.',
  })
  @ApiForbiddenResponse({
    description: 'User does not have permission to access this page.',
  })
  @ApiNotFoundResponse({ description: 'User info does not exist.' })
  async updateUserInfo(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserInfoDto,
  ): Promise<NoSensitiveUserInfoResponse> {
    return this.userInfoService.updateUserInfo(id, body);
  }
}
