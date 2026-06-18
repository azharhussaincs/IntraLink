import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class FilesService {
  private readonly minioClient: Minio.Client;
  private readonly bucket: string;
  private readonly logger = new Logger(FilesService.name);

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT'),
      port: Number(this.configService.get<number>('MINIO_PORT')),
      useSSL: false, // Organization LAN
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
    });
    this.bucket = this.configService.get<string>('MINIO_BUCKET');
    this.ensureBucketExists();
  }

  private async ensureBucketExists() {
    try {
      const exists = await this.minioClient.bucketExists(this.bucket);
      if (!exists) {
        await this.minioClient.makeBucket(this.bucket, 'us-east-1');
        this.logger.log(`Bucket ${this.bucket} created successfully.`);
      }
    } catch (error) {
      this.logger.error(`Error checking/creating bucket: ${error.message}`);
    }
  }

  async uploadFile(fileName: string, buffer: Buffer, metadata: any) {
    try {
      const objectName = `${Date.now()}-${fileName}`;
      await this.minioClient.putObject(this.bucket, objectName, buffer, metadata);
      return {
        url: `http://${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}/${this.bucket}/${objectName}`,
        objectName,
      };
    } catch (error) {
      this.logger.error(`Upload failed: ${error.message}`);
      throw new InternalServerErrorException('File upload failed');
    }
  }

  async getDownloadUrl(objectName: string) {
    try {
      return await this.minioClient.presignedGetObject(this.bucket, objectName, 3600);
    } catch (error) {
      this.logger.error(`Error generating download URL: ${error.message}`);
      throw new InternalServerErrorException('Download URL generation failed');
    }
  }
}
