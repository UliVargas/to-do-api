import { Module } from '@nestjs/common';
import { Task } from '../src/tasks/entities/task.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../src/users/entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      database: ':memory:',
      models: [Task, User],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
  ],
})
export class TestDatabaseModule {}
