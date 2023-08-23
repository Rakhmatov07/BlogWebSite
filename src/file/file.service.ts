import { Injectable } from '@nestjs/common';


@Injectable()
export class FileService {
  createFileName(file: Express.Multer.File) {
    return 'This action adds a new file';
  }
}
