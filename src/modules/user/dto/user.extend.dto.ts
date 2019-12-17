import { IsDate, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserExtendDto {
  @ApiProperty({ required: false, description: '生日' })
  @IsDate({ message: '生日必须是时间格式' })
  @IsOptional()
  birthday?: Date;

  @ApiProperty({ required: false, description: '公司' })
  @IsString({ message: '公司必须的字符类型' })
  @IsOptional()
  company?: string;

  @ApiProperty({ required: false, description: '职位' })
  @IsString({ message: '职位必须是字符类型' })
  @IsOptional()
  position?: string;

  @ApiProperty({ required: false, description: '地址' })
  @IsString({ message: '地址必须是字符类型' })
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false, description: '头像地址' })
  @IsString({ message: '头像地址必须是字符类型' })
  @IsOptional()
  avatar?: string;

  @ApiProperty({ required: false, description: '关联用户id' })
  @IsNumber()
  @IsOptional()
  userId?: number;
}
