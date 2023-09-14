import { Test, TestingModule } from '@nestjs/testing';
import { TestDatabaseModule } from '../../test.module';
import { getModelToken } from '@nestjs/sequelize';
import { createTaskDto, task } from '../../mock/task.mock';
import { mockModel } from '../dependencies';
import { TasksService } from '../../../src/modules/tasks/task.service';
import { Task } from '../../../src/modules/tasks/entities/task.entity';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDatabaseModule],
      providers: [
        TasksService,
        {
          provide: getModelToken(Task),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  describe('create', () => {
    it('Should create a new task and return its data', async () => {
      jest.spyOn(mockModel, 'create').mockReturnValue(task);
      const result = await service.create(createTaskDto);
      expect(result).toEqual(task);
      expect(mockModel.create).toBeCalled();
      expect(mockModel.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('Should return all tasks', async () => {
      jest.spyOn(mockModel, 'findAll').mockReturnValue([task]);
      const result = await service.findAll();
      expect(result).toEqual([task]);
      expect(mockModel.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('Should return one task', async () => {
      jest.spyOn(mockModel, 'findOne').mockReturnValue(task);
      const result = await service.findOne(task.id);
      expect(result).toEqual(task);
      expect(mockModel.findOne).toHaveBeenCalled();
      expect(mockModel.findOne).toBeCalledWith({
        where: { id: task.id },
      });
    });
  });

  // // it('update', () => {});

  describe('remove', () => {
    it('Should delete one task', async () => {
      jest.spyOn(mockModel, 'destroy').mockReturnValue({});
      await service.remove(task.id);
      expect(mockModel.destroy).toHaveBeenCalled();
      expect(mockModel.destroy).toBeCalledWith({
        where: {
          id: task.id,
        },
      });
    });
  });
});
