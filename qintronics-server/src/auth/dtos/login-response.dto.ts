import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/enums/roles.enum';

export class LoginResponseDto {
  @ApiProperty({
    type: String,
    description: `User's ID`,
    example: 'd518236c-1f1e-49f1-b16b-ec14a06305e3',
  })
  userId: string;

  @ApiProperty({
    type: String,
    description: `User's email`,
    example: 'marija@gmail.com',
  })
  email: string;

  @ApiProperty({
    enum: Role,
    description: `User's role`,
    example: Role.Customer,
    default: Role.Customer,
  })
  role: Role;

  @ApiProperty({
    type: Object,
    description: `User's access and refresh tokens`,
    example: {
      accessToken:
        'https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      refreshToken:
        'https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
  })
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
