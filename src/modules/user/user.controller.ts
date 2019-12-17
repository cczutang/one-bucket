import { Controller, Body, Post, UseGuards, Request, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity, UsersService } from './../user';
import { ChangePasswordDto } from './dto/change.password.dto';

@ApiBearerAuth()
@Controller('api/user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
  ) { }

  @Post('password')
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePassword(@Request() request, @Body() dto: ChangePasswordDto): Promise<any> {
    return await this.userService.changePassword(request.user.id, dto);
  }

  @ApiOperation({
    summary: '根据用户id查询用户信息',
    description: '可传递id或者uuid',
  })

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id') id: number,
  ): Promise<UserEntity> {
    return await this.userService.get(id);
  }

  @ApiOperation({ summary: '查询全部用户', description: '支持分页查询' })
  @Get()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('pageSize') pageSize: number,
    @Query('pageNumber') pageNumber: number,
  ): Promise<UserEntity[]> {
    return await this.userService.getAll(pageSize, pageNumber);
  }

}
