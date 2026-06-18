"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FilesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Minio = require("minio");
let FilesService = FilesService_1 = class FilesService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(FilesService_1.name);
        this.minioClient = new Minio.Client({
            endPoint: this.configService.get('MINIO_ENDPOINT'),
            port: Number(this.configService.get('MINIO_PORT')),
            useSSL: false,
            accessKey: this.configService.get('MINIO_ACCESS_KEY'),
            secretKey: this.configService.get('MINIO_SECRET_KEY'),
        });
        this.bucket = this.configService.get('MINIO_BUCKET');
        this.ensureBucketExists();
    }
    async ensureBucketExists() {
        try {
            const exists = await this.minioClient.bucketExists(this.bucket);
            if (!exists) {
                await this.minioClient.makeBucket(this.bucket, 'us-east-1');
                this.logger.log(`Bucket ${this.bucket} created successfully.`);
            }
        }
        catch (error) {
            this.logger.error(`Error checking/creating bucket: ${error.message}`);
        }
    }
    async uploadFile(fileName, buffer, metadata) {
        try {
            const objectName = `${Date.now()}-${fileName}`;
            await this.minioClient.putObject(this.bucket, objectName, buffer, metadata);
            return {
                url: `http://${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}/${this.bucket}/${objectName}`,
                objectName,
            };
        }
        catch (error) {
            this.logger.error(`Upload failed: ${error.message}`);
            throw new common_1.InternalServerErrorException('File upload failed');
        }
    }
    async getDownloadUrl(objectName) {
        try {
            return await this.minioClient.presignedGetObject(this.bucket, objectName, 3600);
        }
        catch (error) {
            this.logger.error(`Error generating download URL: ${error.message}`);
            throw new common_1.InternalServerErrorException('Download URL generation failed');
        }
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = FilesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FilesService);
//# sourceMappingURL=files.service.js.map