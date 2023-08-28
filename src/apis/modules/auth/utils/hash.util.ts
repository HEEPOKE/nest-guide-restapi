import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  public encryptWithPublicKey(publicKey: string, data: string): string {
    const encryptedData = crypto.publicEncrypt(
      {
        key: Buffer.from(publicKey, 'base64'),
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(data),
    );
    return encryptedData.toString('base64');
  }
}
