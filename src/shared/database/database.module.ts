import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from '../../modules/tasks/entities/task.entity';
import { User } from '../../modules/users/entities/user.entity';

const logger = new Logger('Sequelize');

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        models: [Task, User],
        autoLoadModels: true,
        ssl: true,
        logging: (msg: string) => logger.debug(msg),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
