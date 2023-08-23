import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = uuid();
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  createFileName(@UploadedFile() file: Express.Multer.File) {
    return { message: 'Success', fileName: file.filename };
  }
}
