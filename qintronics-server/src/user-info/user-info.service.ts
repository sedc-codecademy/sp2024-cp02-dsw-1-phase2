import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserInfoDto } from './dtos/create-user-info.dto';
import { UpdateUserInfoDto } from './dtos/update-user-info.dto';
import { UserInfo } from './user-info.entity';
import { NoSensitiveUserInfoResponse } from './dtos/no-sensitive-user-info.dto';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
  ) {}

  async createUserInfo(
    body: CreateUserInfoDto,
  ): Promise<NoSensitiveUserInfoResponse> {
    const createdInfo = this.userInfoRepository.create(body);

    return this.userInfoRepository.save(createdInfo);
  }

  async updateUserInfo(
    id: string,
    body: UpdateUserInfoDto,
  ): Promise<NoSensitiveUserInfoResponse> {
    const userInfo = await this.userInfoRepository.findOneBy({ id });

    if (!userInfo)
      throw new NotFoundException(`User info with id: ${id} does not exist!`);

    const infoToUpdate = this.userInfoRepository.merge(userInfo, body);
    const updatedInfo = await this.userInfoRepository.save(infoToUpdate);

    return plainToInstance(NoSensitiveUserInfoResponse, updatedInfo, {
      excludeExtraneousValues: true,
    });
  }

  async deleteAllUserInfo(): Promise<void> {
    await this.userInfoRepository
      .createQueryBuilder('user_info')
      .delete()
      .execute();
  }
}
