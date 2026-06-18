import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionService {
  private readonly logger = new Logger(EncryptionService.name);
  private readonly key: string;

  constructor(private configService: ConfigService) {
    this.key = this.configService.get<string>('ENCRYPTION_KEY');
    if (!this.key || this.key.length < 32) {
      this.logger.warn('ENCRYPTION_KEY is missing or too short! Messages will not be secure.');
    }
  }

  encrypt(text: string): string {
    try {
      return CryptoJS.AES.encrypt(text, this.key).toString();
    } catch (error) {
      this.logger.error(`Encryption failed: ${error.message}`);
      throw new InternalServerErrorException('Encryption failed');
    }
  }

  decrypt(ciphertext: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, this.key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      this.logger.error(`Decryption failed: ${error.message}`);
      throw new InternalServerErrorException('Decryption failed');
    }
  }
}
