import { Module } from '@nestjs/common';
import * as forge from 'node-forge';
import config from 'src/config/config';

@Module({
  providers: [RsaUtil],
  exports: [RsaUtil],
})
export class RsaUtil {
  private privateKeyPem: string;
  private publicKeyPem: string;

  constructor() {
    this.privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----\n${config.PRIVATE_KEY}\n-----END RSA PRIVATE KEY-----`;
    this.publicKeyPem = `-----BEGIN PUBLIC KEY-----\n${config.PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
  }

  decrypt(encryptedMessage: string): string {
    const encryptedBuffer = forge.util.decode64(encryptedMessage);
    const privateKey = forge.pki.privateKeyFromPem(this.privateKeyPem);
    const decryptedBuffer = privateKey.decrypt(encryptedBuffer, 'RSA-OAEP', {
      md: forge.md.sha1.create(),
      mgf1: {
        md: forge.md.sha1.create(),
      },
    });

    return forge.util.decodeUtf8(decryptedBuffer);
  }

  encrypt(plainText: string): string {
    const plainTextBuffer = forge.util.encodeUtf8(plainText);
    const publicKey = forge.pki.publicKeyFromPem(this.publicKeyPem);
    const encryptedBuffer = publicKey.encrypt(plainTextBuffer, 'RSA-OAEP', {
      md: forge.md.sha1.create(),
      mgf1: {
        md: forge.md.sha1.create(),
      },
    });

    return forge.util.encode64(encryptedBuffer);
  }
}
