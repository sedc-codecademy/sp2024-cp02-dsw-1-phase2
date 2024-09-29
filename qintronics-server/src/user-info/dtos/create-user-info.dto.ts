import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserInfoDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    type: String,
    description: 'User ID of the user this user info belongs to',
    example: '6695875f-41a4-448a-8314-a65c7e25af4d',
  })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: `User's name`,
    example: 'Marija',
  })
  name: string;
}
