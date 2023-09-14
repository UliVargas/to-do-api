import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { hash } from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersController');
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userModel.create({
        ...createUserDto,
        password: await hash(createUserDto.password, 10),
      });
    } catch (error) {
      console.log({ error });

      this.handleError(error);
    }
  }

  findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: string) {
    try {
      return await this.userModel.findOne({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userModel.findOne({
        where: { email },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
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
    this.logger.error(error);
    if (error.code === '23505') throw new ConflictException(error.detail);
    throw new InternalServerErrorException(`Please check the server logs`);
  }
}
