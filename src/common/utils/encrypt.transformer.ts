import { encrypt, decrypt } from './crypto.util';

export const encryptTransformer = {
  to: (value: string) => {
    if (!value) return value;
    return encrypt(value);
  },
  from: (value: string) => {
    if (!value) return value;
    return decrypt(value);
  },
};