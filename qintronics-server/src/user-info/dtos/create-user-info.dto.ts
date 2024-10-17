import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserInfoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @ApiProperty({
    type: String,
    description: `User's first name`,
    example: 'Marija',
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
  })
  lastName: string;
}
