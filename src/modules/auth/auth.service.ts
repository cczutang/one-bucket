import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../config';
import { UserEntity, UsersService } from './../user';
import { LoginUserDto } from '../user/dto/login.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) { }

  async createToken(user: UserEntity) {
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({id: user.id}),
      user: user
    };
  }

  async validateUser(payload: LoginUserDto): Promise<any> {
    const user = await this.userService.getByMobileAndPass(payload.name, payload.password);
    if (!user) {
      throw new UnauthorizedException('Wrong login combination!');
    }
    return user;
  }
}
