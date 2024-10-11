import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/common/enums/roles.enum';

export class UpdateUserRoleDto {
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
  role: Role;
}
