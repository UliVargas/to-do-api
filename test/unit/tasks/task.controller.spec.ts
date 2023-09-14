import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../../../src/tasks/task.controller';
import { TasksService } from '../../../src/tasks/task.service';
import { TestDatabaseModule } from '../../test.module';
import { createTaskDto, task } from '../../mock/task.mock';
import { mockService } from '../dependencies';

describe('TasksService', () => {
  let controller: TasksController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDatabaseModule],
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  describe('create', () => {
    it('Should create a new task and return its data', async () => {
      jest.spyOn(mockService, 'create').mockReturnValue(task);
      const result = await controller.create(createTaskDto);
      expect(result).toEqual(task);
      expect(mockService.create).toBeCalled();
      expect(mockService.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('Should return all tasks', async () => {
      jest.spyOn(mockService, 'findAll').mockReturnValue([task]);

      const result = await controller.findAll();

      expect(result).toEqual([task]);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('Should return a one task', async () => {
      jest.spyOn(mockService, 'findOne').mockReturnValue(task);
      const result = await controller.findOne(task.id);
      expect(result).toEqual(task);
      expect(mockService.findOne).toHaveBeenCalled();
      expect(mockService.findOne).toBeCalledWith(task.id);
    });
  });

  // it('update', () => {});

  describe('remove', () => {
    it('Should remove a user by id', async () => {
      jest.spyOn(mockService, 'remove').mockReturnValue({});
      await controller.remove(task.id);
      expect(mockService.remove).toHaveBeenCalledWith(task.id);
    });
  });
});
