import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private readonly userModel: typeof Task,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.userModel.create({ ...createTaskDto });
  }

  async findAll() {
    const tasks = await this.userModel.findAll();
    return tasks;
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  // update(id: string, updateTaskDto: UpdateTaskDto) {
  //   return null;
  // }

  async remove(id: string) {
    return await this.userModel.destroy({
      where: {
        id,
      },
    });
  }
}
