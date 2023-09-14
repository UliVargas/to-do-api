import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from '../src/modules/tasks/entities/task.entity';
import { User } from '../src/modules/users/entities/user.entity';

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
