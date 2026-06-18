import { ConfigService } from '@nestjs/config';
export declare class EncryptionService {
    private configService;
    private readonly logger;
    private readonly key;
    constructor(configService: ConfigService);
    encrypt(text: string): string;
    decrypt(ciphertext: string): string;
}
