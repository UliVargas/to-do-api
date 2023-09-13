import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './task.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';

describe('TasksService', () => {
  let service: TasksService;

  const mockTasksRepository = {
    save: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTasksRepository,
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

    service = module.get<TasksService>(TasksService);
  });

  it(`Should be defined`, () => {
    expect(service).toBeDefined();
  });

  it('create => Should create a new task and return its data', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Unit Test',
      description: "It's a mock test",
      priority: 0,
      status: 0,
      endDate: '2023-09-13T08:36:28.000Z',
    };

    const taskCreated: Omit<Task, 'id' | 'createdAt'> = {
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

    jest.spyOn(mockTasksRepository, 'create').mockReturnValue(taskCreated);
    jest.spyOn(mockTasksRepository, 'save').mockReturnValue(task);

    const result = await service.create(createTaskDto);

    expect(result).toEqual(task);
    expect(mockTasksRepository.save).toBeCalled();
    expect(mockTasksRepository.save).toHaveBeenCalledWith(createTaskDto);
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

    jest.spyOn(mockTasksRepository, 'find').mockReturnValue([task]);

    const result = await service.findAll();

    expect(result).toEqual([task]);
    expect(mockTasksRepository.find).toHaveBeenCalled();
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

    jest.spyOn(mockTasksRepository, 'findOne').mockReturnValue(task);

    const result = await service.findOne(id);

    expect(result).toEqual(task);
    expect(mockTasksRepository.findOne).toHaveBeenCalled();
    expect(mockTasksRepository.findOne).toBeCalledWith({
      where: { id },
    });
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

    jest.spyOn(mockTasksRepository, 'findOne').mockReturnValue(task);
    jest.spyOn(mockTasksRepository, 'remove').mockReturnValue(task);

    const result = await service.remove(id);

    expect(result).toEqual(task);
    expect(mockTasksRepository.findOne).toHaveBeenCalled();
    expect(mockTasksRepository.remove).toHaveBeenCalled();
    expect(mockTasksRepository.findOne).toBeCalledWith({
      where: { id },
    });
    expect(mockTasksRepository.remove).toBeCalledWith(task);
  });
});
