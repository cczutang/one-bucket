import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create.pet.dto';
import { PetEntity } from './pet.entity';
import { UpdatePetDto } from './dto/update.pet.dto';

@ApiTags('pet')
@ApiBearerAuth()
@Controller('api/pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @ApiOperation({ summary: '创建宠物' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreatePetDto): Promise<PetEntity> {
    return await this.petService.create(data);
  }

  @ApiOperation({ summary: '根据id修改宠物' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateById(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() data: UpdatePetDto,
  ): Promise<PetEntity> {
    return await this.petService.updateById(id, data);
  }

  @ApiOperation({ summary: '获取全部的宠物' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async showAll(
    @Query('pageSize', new ParseIntPipe()) pageSize: number,
    @Query('pageNumber', new ParseIntPipe()) pageNumber: number,
  ): Promise<PetEntity[]> {
    return await this.petService.showAll(pageSize, pageNumber);
  }

  @ApiOperation({ summary: '根据id获取宠物' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', new ParseIntPipe()) id: string,
  ): Promise<PetEntity> {
    return await this.petService.getById(id);
  }
}
