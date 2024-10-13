import { Role } from 'src/common/enums/roles.enum';
import { LoginDto } from './login.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto extends LoginDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @ApiProperty({
    type: String,
    description: `User's first name`,
    example: 'Marija',
    minLength: 2,
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @ApiProperty({
    type: String,
    description: `User's last name`,
    example: 'Menchevska',
    minLength: 2,
  })
  lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @ApiPropertyOptional({
    enum: Role,
    description: `User's role`,
    example: Role.Customer,
    default: Role.Customer,
  })
  role?: Role = Role.Customer;
}
