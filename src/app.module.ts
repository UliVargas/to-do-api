import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/task.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TasksModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
