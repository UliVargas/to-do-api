import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User)
    private readonly usersModel: typeof User,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<User> {
    const { id } = payload;
    const user = await this.usersModel.findOne(id);
    if (!user) throw new UnauthorizedException(`Token no valid`);

    if (!user.isActive)
      throw new UnauthorizedException(`User is inactive, talk with an admin`);

    return user;
  }
}
