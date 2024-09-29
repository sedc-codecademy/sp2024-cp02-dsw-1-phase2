import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class LogoutDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    type: String,
    description: `User's ID`,
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: `User's refresh token`,
    example:
      'https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  refreshToken: string;
}
