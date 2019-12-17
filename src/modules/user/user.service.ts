import * as crypto from 'crypto';
import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { RegisterUserDto } from './dto/register.user.dto';
import { ChangePasswordDto } from './dto/change.password.dto';
import { NodeAuth } from 'node-auth0';
import { Validator } from 'class-validator';
import { createPassword } from '../../utils/password';
@Injectable()
export class UsersService {
  private nodeAuth: NodeAuth;
  private validator: Validator;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.nodeAuth = new NodeAuth(8, 10, true);
    this.validator = new Validator();
  }

  async get(id: number) {
    return this.userRepository.findOne(id);
  }

  async getByMobile(mobile: string) {
    return await this.userRepository.createQueryBuilder('users')
      .where('users.mobile = :mobile')
      .setParameter('mobile', mobile)
      .getOne();
  }

  async getByMobileAndPass(mobile: string, password: string) {
    return await this.userRepository.createQueryBuilder('users')
      .where('users.mobile = :mobile and users.password = :password')
      .setParameter('mobile', mobile)
      .setParameter('password', createPassword(password))
      .getOne();
  }

  async create(
    payload: RegisterUserDto,
  ) {
    const user = await this.getByMobile(payload.mobile);

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }
    payload.password = createPassword(payload.password);
    return await this.userRepository.save(payload);
  }

  async changePassword(id: string, dto: ChangePasswordDto): Promise<string> {
    const { password, newPassword, repPassword } = dto;
    if (!Object.is(newPassword, repPassword)) {
      throw new HttpException('两次密码不一致', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOne({ where: { id } });
    // 当前用户存在且旧密码校验正确才可以修改
    if (user && this.nodeAuth.checkPassword(password, user.password)) {
      await this.userRepository.update(id, {
        password: this.nodeAuth.makePassword(newPassword),
      });
      return '修改成功';
    } else {
      throw new HttpException('修改失败', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(pageSize: number = 15, pageNumber: number = 1) {
    const [users, total] = await this.userRepository
      .createQueryBuilder('user')
      .offset(pageNumber - 1)
      .limit(pageSize)
      .orderBy('id', 'DESC')
      .getManyAndCount();
    return users;
  }

}
