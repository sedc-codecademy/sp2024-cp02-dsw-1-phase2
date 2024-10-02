import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Role } from 'src/common/enums/roles.enum';
import { NoSensitiveUserInfoResponse } from 'src/user-info/dtos/no-sensitive-user-info.dto';

export class NoSensitiveUserResponse {
  @Expose()
  @ApiProperty({
    type: String,
    description: `User's ID`,
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  id: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: `User's email`,
    example: 'marija@gmail.com',
  })
  email: string;

  @Expose()
  @ApiProperty({
    enum: Role,
    description: `User's role`,
    example: Role.Customer,
    default: Role.Customer,
  })
  role: Role;

  @Expose()
  @Type(() => NoSensitiveUserInfoResponse)
  userInfo: NoSensitiveUserInfoResponse;
}
