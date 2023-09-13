import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TasksService } from '../service/task.service';

describe('TasksService', () => {
  let controller: TasksController;

  const mockTasksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          dropSchema: true,
          entities: [Task],
          synchronize: true,
        }),
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it(`Should be defined`, () => {
    expect(controller).toBeDefined();
  });

  it('create => Should create a new task and return its data', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Unit Test',
      description: "It's a mock test",
      priority: 0,
      status: 0,
      endDate: '2023-09-13T08:36:28.000Z',
    };

    const task: Task = {
      id: 'abc123',
      title: 'Unit Test',
      description: "It's a mock test",
      priority: 0,
      status: 0,
      endDate: '2023-09-13T08:36:28.000Z',
      createdAt: '2023-09-13T08:36:28.000Z',
    };

    jest.spyOn(mockTasksService, 'create').mockReturnValue(task);

    const result = await controller.create(createTaskDto);

    expect(result).toEqual(task);
    expect(mockTasksService.create).toBeCalled();
    expect(mockTasksService.create).toHaveBeenCalledWith(createTaskDto);
  });

  it('findAll', async () => {
    const task: Task = {
      id: 'abc123',
      title: 'Unit Test',
      description: "It's a mock test",
      priority: 0,
      status: 0,
      endDate: '2023-09-13T08:36:28.000Z',
      createdAt: '2023-09-13T08:36:28.000Z',
    };

    jest.spyOn(mockTasksService, 'findAll').mockReturnValue([task]);

    const result = await controller.findAll();

    expect(result).toEqual([task]);
    expect(mockTasksService.findAll).toHaveBeenCalled();
  });

  it('findOne', async () => {
    const id = 'abc123';
    const task: Task = {
      id: 'abc123',
      title: 'Unit Test',
      description: "It's a mock test",
      priority: 0,
      status: 0,
      endDate: '2023-09-13T08:36:28.000Z',
      createdAt: '2023-09-13T08:36:28.000Z',
    };

    jest.spyOn(mockTasksService, 'findOne').mockReturnValue(task);

    const result = await controller.findOne(id);

    expect(result).toEqual(task);
    expect(mockTasksService.findOne).toHaveBeenCalled();
    expect(mockTasksService.findOne).toBeCalledWith(id);
  });
  // it('update', () => {});
  it('remove', async () => {
    const id = 'abc123';
    const task: Task = {
      id: 'abc123',
      title: 'Unit Test',
      description: "It's a mock test",
      priority: 0,
      status: 0,
      endDate: '2023-09-13T08:36:28.000Z',
      createdAt: '2023-09-13T08:36:28.000Z',
    };

    jest.spyOn(mockTasksService, 'remove').mockReturnValue(task);

    const result = await controller.remove(id);

    expect(result).toEqual(task);
    expect(mockTasksService.remove).toHaveBeenCalledWith(id);
  });
});
