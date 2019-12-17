import * as crypto from 'crypto';

export function createPassword(password: string): string {
  return crypto.createHmac('sha256', password).digest('hex');
}
