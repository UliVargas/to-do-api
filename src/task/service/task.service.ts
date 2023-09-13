import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(newTask);
  }

  async findAll() {
    const tasks = await this.tasksRepository.find();
    return tasks;
  }

  async findOne(id: string) {
    return await this.tasksRepository.findOne({
      where: {
        id,
      },
    });
  }

  // update(id: string, updateTaskDto: UpdateTaskDto) {
  //   return null;
  // }

  async remove(id: string) {
    const task = await this.findOne(id);
    return this.tasksRepository.remove(task);
  }
}
