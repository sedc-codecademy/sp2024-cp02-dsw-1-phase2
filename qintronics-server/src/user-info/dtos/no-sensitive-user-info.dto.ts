import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class NoSensitiveUserInfo {
  @Expose()
  @ApiProperty({
    type: String,
    description: `Card ID`,
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  id: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: `User's name`,
    example: 'Marija',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: `User's phone number`,
    example: '+3891234578',
  })
  phone: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: `User's address`,
    example: 'Partizanska, bb',
  })
  address: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: `User's city`,
    example: 'Skopje',
  })
  city: string;

  @Expose()
  @ApiProperty({
    type: Number,
    description: `User's postal code`,
    example: 1000,
  })
  postalCode: number;

  @Expose()
  @ApiProperty({
    type: String,
    description: `User's country`,
    example: 'Macedonia',
  })
  country: string;
}
