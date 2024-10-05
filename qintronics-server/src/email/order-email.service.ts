import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';

interface Email {
  to: string;
  data: any;
}
@Injectable()
export class OrderEmailService {
  constructor(
    @Inject(MailerService)
    private readonly mailerService: MailerService,
  ) {}

  async welcomeEmail(data) {
    const { email, name } = data;
    console.log('Sending email with context:', { name });

    const subject = `Welcome to Company: ${name}`;

    await this.mailerService.sendMail({
      from: '"Qintronics" <no-reply@qintronics.com>',
      to: email,
      subject,
      template: './welcome',
      context: {
        name,
      },
    });
  }
}
