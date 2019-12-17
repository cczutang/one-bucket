import { IsNotEmpty } from 'class-validator';
import { ApiProperty  } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty ({ description: '旧密码' })
  @IsNotEmpty({ message: '旧密码不能为空' })
  readonly password: string;

  @ApiProperty({ description: '新密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly newPassword: string;

  @ApiProperty({ description: '重复密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly repPassword: string;
}
