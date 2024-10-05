import { Injectable } from '@nestjs/common';

@Injectable()
export class ResetPasswordEmailService {
  constructor() {}

  async sendResetPasswordEmail(data) {
    const { email, name } = data;
    console.log('Sending email with context:', { name });

    const subject = `Reset your password: ${name}`;

    return { email, subject, name };
  }
}
