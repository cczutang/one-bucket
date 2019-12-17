import {
  Controller,
  Post,
  UseInterceptors,
  HttpStatus,
  UploadedFile,
  HttpCode,
  Request, UseGuards,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@Controller('api/files')
@ApiTags('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: '上传文件' })
  @Post()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFile() files) {
    console.log(files)
    return this.fileService.uploadFile({
      files,
      category: '3',
      typeList: [],
    });
  }
}
