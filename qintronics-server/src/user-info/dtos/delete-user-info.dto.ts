import { ApiPropertyOptional } from '@nestjs/swagger';
import { Equals, IsOptional } from 'class-validator';

export class DeleteUserInfoDto {
  @IsOptional()
  @Equals(null)
  @ApiPropertyOptional({
    type: String,
    description: `User's last name`,
    example: null,
  })
  lastName?: null;

  @IsOptional()
  @Equals(null)
  @ApiPropertyOptional({
    type: String,
    description: `User's phone number`,
    example: null,
  })
  phone?: null;

  @IsOptional()
  @Equals(null)
  @ApiPropertyOptional({
    type: String,
    description: `User's address`,
    example: null,
  })
  address?: null;

  @IsOptional()
  @Equals(null)
  @ApiPropertyOptional({
    type: String,
    description: `User's city`,
    example: null,
  })
  city?: null;

  @IsOptional()
  @Equals(null)
  @ApiPropertyOptional({
    type: Number,
    description: `User's postal code`,
    example: null,
  })
  postalCode?: null;

  @IsOptional()
  @Equals(null)
  @ApiPropertyOptional({
    type: String,
    description: `User's country`,
    example: null,
  })
  country?: null;

  @IsOptional()
  @Equals(null)
  @ApiPropertyOptional({
    type: String,
    description: `Card name`,
    example: null,
  })
  ccFullName?: null;

  @IsOptional()
  @Equals(null)
  @ApiPropertyOptional({
    type: String,
    description: `Card number`,
    example: null,
  })
  ccNum?: null;

  @IsOptional()
  @Equals(null)
  @ApiPropertyOptional({
    type: Date,
    description: `Card expiration date`,
    example: null,
  })
  expDate?: null;

  @IsOptional()
  @Equals(null)
  @ApiPropertyOptional({
    type: Number,
    description: `CVV card number`,
    example: null,
  })
  cvv?: null;
}
