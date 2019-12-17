import { PetDto } from './pet.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdatePetDto extends PetDto {
  @ApiProperty({ description: '宠物名称' })
  @IsNotEmpty({ message: '不能为空' })
  @IsString({ message: '必须是字符类型' })
  @IsOptional()
  readonly name?: string;
}
