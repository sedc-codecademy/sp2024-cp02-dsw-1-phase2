import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { Role } from 'src/common/enums/roles.enum';
import { ICurrentUser } from 'src/common/types/current-user.interface';
import { UserInfoService } from 'src/user-info/user-info.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userInfoService: UserInfoService,
  ) {}

  // Just customer users or?
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: Role.Customer },
      relations: { userInfo: true },
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  // will everything be returned (even the sensitive info)? If so, make NoSensitiveUser in the controller (will use same function in auth, where refresh tokens are needed, and in NoSensitiveUser they won't be exposed)
  async getUserProfile(id: string, currentUser: ICurrentUser): Promise<User> {
    if (id !== currentUser.userId)
      throw new ForbiddenException(
        'User does not have permission to access this page.',
      );

    const foundUser = await this.userRepository.findOne({
      where: { id, role: Role.Customer }, // Just customer users or?
      relations: { userInfo: true },
    });

    foundUser.userInfo.ccNum = `************${foundUser.userInfo.ccNum.slice(-4)}`;

    return foundUser;
  }

  // same here about sensitivity
  async getUserByEmail(email: string): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { email },
    });

    if (!foundUser) throw new NotFoundException(`User does not exist.`);

    return foundUser;
  }

  async createUser(body: RegisterDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      email: body.email,
    });

    if (existingUser) throw new ConflictException('User already exists!');

    const { name, ...restOfBody } = body;

    const savedUserInfo = await this.userInfoService.createUserInfo({ name });

    restOfBody.password = await bcrypt.hash(
      restOfBody.password,
      Number(process.env.BCRYPT_SALT),
    );

    const fullUser = {
      ...restOfBody,
      userInfo: savedUserInfo,
    };

    const createdUser = this.userRepository.create(fullUser);
    return this.userRepository.save(createdUser);
  }

  async saveRefreshToken(user: User, refreshToken: string): Promise<void> {
    await this.userRepository.update(user.id, {
      refreshTokens: [...user.refreshTokens, refreshToken],
    });
  }

  async removeRefreshToken(user: User, refreshToken: string): Promise<void> {
    await this.userRepository.update(user.id, {
      refreshTokens: user.refreshTokens.filter(
        (token) => token !== refreshToken,
      ),
    });
  }

  async deleteUser(id: string): Promise<void> {
    // Relations must be loaded here, or else there won't be cascade delete
    const userToBeDeleted = await this.userRepository.findOne({
      where: { id },
      relations: { userInfo: true },
    });

    if (!userToBeDeleted) return;

    // Soft remove must receive an entity or there will be an internal error
    await this.userRepository.softRemove(userToBeDeleted);
  }

  async backfillUsers(): Promise<User[]> {
    await this.userRepository.createQueryBuilder('user').delete().execute();
    await this.userInfoService.deleteAllUserInfo();

    const users = [
      {
        email: 'admin@example.com',
        password: 'Admin11!',
        name: 'Admin',
        role: Role.Admin,
      },
      {
        email: 'delivery@example.com',
        password: 'Delivery1!',
        name: 'Delivery',
        role: Role.DeliveryPerson,
      },
      {
        email: 'customer1@example.com',
        password: 'Customer1!',
        name: 'Customer1',
        role: Role.Customer,
      },
      {
        email: 'customer2@example.com',
        password: 'Customer2!',
        name: 'Customer2',
        role: Role.Customer,
      },
      {
        email: 'customer3@example.com',
        password: 'Customer3!',
        name: 'Customer3',
        role: Role.Customer,
      },
    ];

    for (const user of users) {
      user.password = await bcrypt.hash(
        user.password,
        Number(process.env.BCRYPT_SALT),
      );

      const savedUserInfo = await this.userInfoService.createUserInfo({
        name: user.name,
      });

      const { name, ...restOfUser } = user;

      const fullUser = {
        ...restOfUser,
        userInfo: savedUserInfo,
      };

      const createdUser = this.userRepository.create(fullUser);
      await this.userRepository.save(createdUser);
    }

    return this.userRepository.find({ relations: { userInfo: true } });
  }

  // update password??
  // can admin search for one particular user?
}
