import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { Task } from './entities/task.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([Task])],
  exports: [SequelizeModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
