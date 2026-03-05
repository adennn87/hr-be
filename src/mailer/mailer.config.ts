import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  host: process.env.MAIL_HOST || 'email-smtp.ap-southeast-2.amazonaws.com',
  port: Number(process.env.MAIL_PORT ?? 465),
  secure: true,
  user: process.env.MAIL_USER || 'AKIARKKAI7JCJLIAI6ST',
  pass: process.env.MAIL_PASS || 'BGiCJDWrm2/RMS2JXSaxjfqPaXuvdLUu7/gF0gCnq3ny',
}));
