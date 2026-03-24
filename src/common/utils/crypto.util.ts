import * as crypto from 'crypto';

import * as dotenv from 'dotenv';

dotenv.config();

const algorithm = 'aes-256-cbc';

const secretKey = crypto
  .createHash('sha256')
  .update(process.env.ENCRYPT_KEY as string)
  .digest();

export function encrypt(value: string): string {
  if (!value) return value;

  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv,
  );

  let encrypted = cipher.update(value);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(value: string): string {
  if (!value) return value;

  try {
    if (!value.includes(':')) {
      return value;
    }

    const parts = value.split(':');

    const ivHex = parts.shift();
    if (!ivHex) return value;

    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');

    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      iv,
    );

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  } catch (error) {
    return value;
  }
}