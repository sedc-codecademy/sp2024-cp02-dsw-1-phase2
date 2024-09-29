import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { Role } from 'src/common/enums/roles.enum';
import { Repository } from 'typeorm';
import { NoSensitiveUser } from './dtos/no-sensitive-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  //
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
  async getUserProfile(id: string): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { id, role: Role.Customer },
      relations: { userInfo: true },
    });

    if (!foundUser) throw new NotFoundException(`User does not exist.`);

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

  async createUser(body: RegisterDto): Promise<NoSensitiveUser> {
    const existingUser = await this.userRepository.findOneBy({
      email: body.email,
    });

    if (existingUser) throw new BadRequestException('User already exists!');

    const { name, ...restOfBody } = body;

    restOfBody.password = await bcrypt.hash(
      restOfBody.password,
      Number(process.env.BCRYPT_SALT),
    );

    const createdUser = this.userRepository.create(restOfBody);
    const savedUser = await this.userRepository.save(createdUser);

    return plainToInstance(NoSensitiveUser, savedUser);
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

  async backfillUsers() {
    await this.userRepository.createQueryBuilder('user').delete().execute();

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
        email: 'customer@example.com',
        password: 'Customer1!',
        name: 'Customer',
        role: Role.Customer,
      },
    ];

    for (const user of users) {
      user.password = await bcrypt.hash(
        user.password,
        Number(process.env.BCRYPT_SALT),
      );
    }

    const createdUsers = this.userRepository.create(users);

    return this.userRepository.save(createdUsers);
  }

  // update password??
  // can admin search for one particular user?
}
