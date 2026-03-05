import { MailerService } from './mailer.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import MailConfig from './mailer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [MailConfig],
    }),
  ],
  providers: [ConfigService, MailerService],
  exports: [MailerService],
})
export class MailerModule {}
