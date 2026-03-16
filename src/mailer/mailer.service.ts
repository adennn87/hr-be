import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

import { VerifyAccountTemplate } from './templates/verify-account.template';
import { ResetPasswordTemplate } from './templates/reset-password.template';
// import { ShareFileTemplate } from './templates/share-file.template';


import {  UpdatePassTemplate } from './templates/register.template';
import { ChangePasswordTemplate } from './templates/change-password.template';
import { LoginOtpTemplate } from './templates/login.template';

interface MailOption {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('mail.host'),
      port: this.configService.get<number>('mail.port'),
      secure: this.configService.get<boolean>('mail.secure'),
      auth: {
        user: this.configService.get<string>('mail.user'),
        pass: this.configService.get<string>('mail.pass'),
      },
    });
  }

  async sendMail(mailOptions: MailOption) {
    try {
      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendVerifyAccountEmail(email: string, verify_link: string) {
    const mailOptions = {
      from: 'Arcanic AI <no-reply@arcanic.ai>',
      to: email,
      subject: 'Xác nhận tài khoản Arcanic AI',
      html: VerifyAccountTemplate(verify_link),
    };

    this.sendMail(mailOptions);
  }

  async sendResetPasswordEmail(email: string, reset_link: string) {
    const mailOptions = {
      from: 'Arcanic AI <no-reply@arcanic.ai>',
      to: email,
      subject: 'Đặt lại mật khẩu cho tài khoản Arcanic AI',
      html: ResetPasswordTemplate(reset_link),
    };

    this.sendMail(mailOptions);
  }

    async sendLoginOtpEmail(email: string, reset_link: string) {
    const mailOptions = {
      from: 'Arcanic AI <no-reply@arcanic.ai>',
      to: email,
      subject: 'Mã OTP đăng nhập cho tài khoản HR Management',
      html: LoginOtpTemplate(reset_link),
    };

    this.sendMail(mailOptions);
  }

  async sendChangePasswordEmail(email: string, reset_link: string) {
    const mailOptions = {
      from: 'Arcanic AI <no-reply@arcanic.ai>',
      to: email,
      subject: 'Thay đổi mật khẩu cho tài khoản Arcanic AI',
      html: ChangePasswordTemplate(reset_link),
    };

    this.sendMail(mailOptions);
  }
}
