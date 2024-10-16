import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  MinLength,
  IsNumberString,
  Length,
  Matches,
  IsDate,
  MinDate,
  Max,
} from 'class-validator';

export class UpdateUserInfoDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @ApiProperty({
    type: String,
    description: `User's name`,
    example: 'Marija',
  })
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @ApiProperty({
    type: String,
    description: `User's phone number`,
    example: '+3891234578',
  })
  phone?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @ApiProperty({
    type: String,
    description: `User's address`,
    example: 'Partizanska, bb',
  })
  address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    description: `User's city`,
    example: 'Skopje',
  })
  city?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({
    type: Number,
    description: `User's postal code`,
    example: 1000,
  })
  postalCode?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    description: `User's country`,
    example: 'Macedonia',
  })
  country?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    description: `Card name`,
    example: 'Jane Doe',
  })
  ccFullName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  @Length(16, 16)
  @Matches(/^(34|37|4|5|6)/, {
    message: 'ccNum must start with 34, 37, 4, 5 or 6',
  })
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    description: `Card number`,
    example: '0123495678012345',
  })
  ccNum?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date(), { message: `Expiration date can't be in the past.` })
  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    type: Date,
    description: `Card expiration date`,
    example: '2024-05-01 00:00:00',
  })
  expDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(100)
  @Max(9999)
  @ApiProperty({
    type: Number,
    description: `CVV card number`,
    example: '123 or 1234',
  })
  cvv?: number;
}
