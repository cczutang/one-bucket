import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create.pet.dto';
import { PetEntity } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePetDto } from './dto/update.pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
  ) {}

  async create(data: CreatePetDto): Promise<PetEntity> {
    return await this.petRepository.save(data);
  }

  async updateById(
    id: string,
    data: UpdatePetDto,
  ): Promise<PetEntity> {
    await this.petRepository.update(id, data);
    return await this.petRepository.findOne({ where: { id } });
  }

  async showAll(pageSize: number, pageNumber: number): Promise<any> {
    const [roles, total] = await this.petRepository
      .createQueryBuilder('pet')
      .offset(pageNumber - 1) // 从多少条开始
      .limit(pageSize) // 查询多少条数据
      .orderBy('id', 'DESC') // 排序
      .getManyAndCount(); // 查询到数据及个数，返回的是一个数组
    return [roles, total];
  }

  async getById(id: string): Promise<PetEntity> {
    return await this.petRepository.findOne({ where: { id } });
  }
}
