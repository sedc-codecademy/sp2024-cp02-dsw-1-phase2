import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsJWT()
  @ApiProperty({
    type: String,
    description: `User's reset password token`,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZjcxMjhmYi05MGUxLTQ5MzUtOTkzYy00ZGI3YmJhYTQ0ZjYiLCJ1c2VySWQiOiI0ZjcxMjhmYi05MGUxLTQ5MzUtOTkzYy00ZGI3YmJhYTQ0ZjYiLCJlbWFpbCI6ImN1c3RvbWVyQGV4YW1wbGUuY29tIiwicm9sZSI6IkN1c3RvbWVyIiwiaWF0IjoxNzI3NzI0OTgxLCJleHAiOjE3Mjc4MTEzODEsImlzcyI6IlFpbnRyb25pY3MifQ.GSwJ-dVxSG7LEcTkLGEFQ8BX9RT5MihZnX_pRurSyG8',
  })
  token: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @ApiProperty({
    type: String,
    description: `User's new password`,
    example: 'Customer1!',
    minLength: 8,
  })
  password: string;
}
