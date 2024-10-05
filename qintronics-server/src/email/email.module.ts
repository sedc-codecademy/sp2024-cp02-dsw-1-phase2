import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { join } from 'path';
import { EmailController } from './email.controller';
import { OrderEmailService } from './order-email.service';
import { ResetPasswordEmailService } from './reset-password-email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule into MailerModule
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: configService.get<string>('EMAIL_USER'), // Get values from ConfigService
            pass: configService.get<string>('EMAIL_PASSWORD'),
          },
        },
        // defaults: {
        //   from: `"Qintronics" <no-reply@qintronics.com>`,
        // },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [OrderEmailService, ResetPasswordEmailService],
})
export class EmailModule {}
