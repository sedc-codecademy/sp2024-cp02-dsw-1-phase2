import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserInfoController } from './user-info.controller';
import { UserInfo } from './user-info.entity';
import { UserInfoService } from './user-info.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, User])],
  controllers: [UserInfoController],
  providers: [UserInfoService, UsersService],
})
export class UserInfoModule {}
