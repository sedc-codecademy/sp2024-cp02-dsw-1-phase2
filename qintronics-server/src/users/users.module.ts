import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserInfo } from 'src/user-info/user-info.entity';
import { UserInfoService } from 'src/user-info/user-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo])],
  controllers: [UsersController],
  providers: [UsersService, UserInfoService],
})
export class UsersModule {}
