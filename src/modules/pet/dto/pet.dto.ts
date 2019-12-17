import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class PetDto {
  @ApiProperty({ required: false, description: '当前是否可用' })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: '不是数字' })
  @IsEnum({ 禁用: 0, 当前可用: 1 }, { message: '必须是0或者1' })
  @Transform(val => parseInt(val, 10))
  @IsOptional()
  status: number;

  @ApiProperty({ required: false, description: '描述' })
  @IsString({ message: '必须是字符串类型' })
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, description: '宠物id' })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: '不是数字' })
  @Transform(val => parseInt(val, 10))
  @IsOptional()
  parentId?: number;
}

