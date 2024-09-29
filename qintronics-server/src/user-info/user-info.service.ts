import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateUserInfoDto } from './dtos/create-user-info.dto';
import { NoSensitiveUserInfo } from './dtos/no-sensitive-user-info.dto';
import { UpdateUserInfoDto } from './dtos/update-user-info.dto';
import { UserInfo } from './user-info.entity';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
    private readonly usersService: UsersService,
  ) {}

  async createUserInfo(body: CreateUserInfoDto): Promise<NoSensitiveUserInfo> {
    const createdInfo = this.userInfoRepository.create(body);

    const savedInfo = await this.userInfoRepository.save(createdInfo);

    return plainToInstance(NoSensitiveUserInfo, savedInfo);
  }

  async updateUserInfo(
    userId: string,
    body: UpdateUserInfoDto,
  ): Promise<NoSensitiveUserInfo> {
    await this.usersService.getUserProfile(userId);

    const userInfo = await this.userInfoRepository.findOneBy({ userId });

    const infoToUpdate = this.userInfoRepository.merge(userInfo, body);
    const updatedInfo = await this.userInfoRepository.save(infoToUpdate);

    return plainToInstance(NoSensitiveUserInfo, updatedInfo);
  }

  async backfillCustomerInfo(): Promise<UserInfo> {
    await this.userInfoRepository
      .createQueryBuilder('userInfo')
      .delete()
      .execute();

    const customerInfo = {
      name: 'Customer',
      phone: '+38975123456',
      address: 'Partizanska bb',
      city: 'Skopje',
      postalCode: 1000,
      country: 'Macedonia',
      ccFullName: 'Customer Customerson',
      ccNum: '5346123456781234',
      expDate: '02-10-2024',
      cvv: 123,
      userId: 'd518236c-1f1e-49f1-b16b-ec14a06305e3',
    };

    const createdInfo = this.userInfoRepository.create(customerInfo);

    return this.userInfoRepository.save(createdInfo);
  }
}
