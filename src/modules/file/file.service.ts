import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createWriteStream } from 'fs';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  public uploadFile({
                      files,
                      category = '',
                      typeList = [],
                    }: {
    files: any;
    category?: string;
    typeList?: string[];
  }):
    | { url: string; fileName: string }
    | Array<{ url: string; fileName: string }> {
    // 基础的目录
    const uplaodBasePath = 'public/uploads';
    // 根据时间格式生成文件前缀
    const filePrefix = new Date().getTime().toString();
    category = `id${category}`
    // 递归创建文件夹
    this.mkdirsSync(path.join(uplaodBasePath, category));
    // 如果上传是单个文件
    if (Object.is(toString.call(files), '[object Object]')) {
      // 生成文件名
      const extname = path.extname(files.originalname).toLocaleLowerCase();
      // tslint:disable-next-line:radix
      const filename: string = `${filePrefix}${extname}`;
      // 如果有文件格式约束就判断上传文件
      if (
        typeList.length &&
        !typeList.map(item => item.toLocaleLowerCase()).includes(extname)
      ) {
        throw new HttpException(
          `上传图片格式限制为:[${typeList}]其中一种,你上传的图片格式为:${extname}`,
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      const target = path.join(uplaodBasePath, category, filename);
      const writeImage = createWriteStream(target);
      writeImage.write(files.buffer);
      return { url: target, fileName: files.originalname };
    } else if (Array.isArray(Array.from(files))) {
      if (files.length === 0) {
        return { url: '', fileName: '' };
      }
      const filenameList: Array<{ url: string; fileName: string }> = [];
      files.forEach((file, index) =>  {
        // 生成文件名
        const extname = path.extname(file.originalname).toLocaleLowerCase();
        // tslint:disable-next-line:radix
        const filename: string = `${filePrefix}${extname}-${index}`;
        // 如果有文件格式约束就判断上传文件
        if (
          typeList.length &&
          !typeList.map(item => item.toLocaleLowerCase()).includes(extname)
        ) {
          throw new HttpException(
            `上传图片格式限制为:[${typeList}]其中一种,你上传的图片格式里包含了:${extname}`,
            HttpStatus.NOT_ACCEPTABLE,
          );
        }
        const target = path.join(uplaodBasePath, category, filename);
        filenameList.push({ url: target, fileName: file.originalname });
        const writeImage = createWriteStream(target);
        writeImage.write(file.buffer);
      });
      return filenameList;
    } else {
      throw new HttpException('上传文件失败', HttpStatus.BAD_REQUEST);
    }
  }

  private mkdirsSync(dirname: string): boolean {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (this.mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  }
}
