import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    description: `User's email`,
    example: 'customer@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    type: String,
    description: `User's password`,
    example: 'Customer1!',
    minLength: 8,
  })
  password: string;
}
