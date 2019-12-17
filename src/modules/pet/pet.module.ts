import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PetEntity } from './pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([PetEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [PetService],
  controllers: [PetController],
})
export class PetModule {}
