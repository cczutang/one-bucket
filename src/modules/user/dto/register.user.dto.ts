import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    required: false,
  })
  @IsMobilePhone('zh-CN')
  mobile: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  wechat: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
