import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from 'src/user-info/user-info.entity';
import { UserInfoService } from 'src/user-info/user-info.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserInfo]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        // Two different  secrets will be used when signing - for access and refresh tokens, that's why secret is not included here, in order to not sign both tokens with the same secret
        // This will be automatically added to the tokens when they're signed
        signOptions: {
          issuer: configService.get('JWT_ISSUER'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, UserInfoService, JwtStrategy],
})
export class AuthModule {}
