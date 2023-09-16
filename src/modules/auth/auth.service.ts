import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({
      where: { email: loginDto.email },
      raw: true,
    });

    if (!user) throw new NotFoundException(`User not found`);

    return {
      ...user,
      token: this.jwtService.sign({
        id: user.id,
      }),
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      return await this.userModel.create({
        ...createUserDto,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  generateTemporalToken(userId: string) {
    return this.jwtService.sign(
      {
        id: userId,
      },
      { expiresIn: '10m' },
    );
  }

  async confirmAccount(userId: string) {
    const user = await this.userModel.findByPk(userId);
    if (user.verifiedEmail) throw new ConflictException(`User is confirm`);
    return user.update({ verifiedEmail: true });
  }

  private handleError(error) {
    this.logger.error(error.parent);
    if (error.parent.code === '23505')
      throw new ConflictException(error.parent.detail);
    throw new InternalServerErrorException(`Please check the server logs`);
  }
}
