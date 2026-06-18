import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assume created or use standard

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any) {
    return this.filesService.uploadFile(file.originalname, file.buffer, {
      'Content-Type': file.mimetype,
    });
  }

  @Get('download/:objectName')
  async getDownloadUrl(@Param('objectName') objectName: string) {
    const url = await this.filesService.getDownloadUrl(objectName);
    return { url };
  }
}
