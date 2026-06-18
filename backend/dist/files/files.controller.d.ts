import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    upload(file: any): Promise<{
        url: string;
        objectName: string;
    }>;
    getDownloadUrl(objectName: string): Promise<{
        url: string;
    }>;
}
