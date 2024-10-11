import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @ApiProperty({
    type: String,
    description: `User's email`,
    example: 'customer1@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @ApiProperty({
    type: String,
    description: `User's password`,
    example: 'Customer1!',
    minLength: 8,
  })
  password: string;
}
