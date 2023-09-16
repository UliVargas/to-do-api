import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersController');
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userModel.update(
        { updateUserDto },
        {
          where: { id },
        },
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    return this.userModel.destroy({
      where: { id },
    });
  }

  private handleError(error) {
    this.logger.error(error.parent);
    if (error.parent.code === '23505')
      throw new ConflictException(error.parent.detail);
    throw new InternalServerErrorException(`Please check the server logs`);
  }
}
