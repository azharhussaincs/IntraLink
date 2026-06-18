import { ConfigService } from '@nestjs/config';
export declare class FilesService {
    private configService;
    private readonly minioClient;
    private readonly bucket;
    private readonly logger;
    constructor(configService: ConfigService);
    private ensureBucketExists;
    uploadFile(fileName: string, buffer: Buffer, metadata: any): Promise<{
        url: string;
        objectName: string;
    }>;
    getDownloadUrl(objectName: string): Promise<string>;
}
