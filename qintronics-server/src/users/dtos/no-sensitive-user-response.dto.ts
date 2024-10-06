import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Role } from 'src/common/enums/roles.enum';
import { NoSensitiveUserInfoResponse } from 'src/user-info/dtos/no-sensitive-user-info-response.dto';

export class NoSensitiveUserResponse {
  @Expose()
  @ApiResponseProperty({
    type: String,
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  id: string;

  @Expose()
  @ApiResponseProperty({
    type: String,
    example: 'marija@gmail.com',
  })
  email: string;

  @Expose()
  @ApiResponseProperty({
    enum: Role,
    example: Role.Customer,
  })
  role: Role;

  @Expose()
  @Type(() => NoSensitiveUserInfoResponse)
  @ApiResponseProperty({
    type: NoSensitiveUserInfoResponse,
  })
  userInfo: NoSensitiveUserInfoResponse;
}
