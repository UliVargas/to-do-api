import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import { TasksModule } from './modules/tasks/task.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TasksModule,
    UsersModule,
    AuthModule,
    EmailModule,
  ],
})
export class AppModule {}
