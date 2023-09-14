import { CreateTaskDto } from '../../src/modules/tasks/dto/create-task.dto';
import { Task } from '../../src/modules/tasks/interfaces/task.interaface';
import { user } from './user.mock';

export const createTaskDto: CreateTaskDto = {
  title: 'Unit Test',
  description: "It's a mock test",
  priority: 0,
  status: 0,
  endDate: '2023-09-13T08:36:28.000Z',
};

export const task: Task = {
  id: 'task123',
  title: 'Unit Test',
  description: "It's a mock test",
  priority: 0,
  status: 0,
  endDate: '2023-09-13T08:36:28.000Z',
  createdAt: '2023-09-13T08:36:28.000Z',
  userId: 'user123',
  user: user,
};
