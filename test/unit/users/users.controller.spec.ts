import { Test, TestingModule } from '@nestjs/testing';
import { TestDatabaseModule } from '../../test.module';
import { ConfigModule } from '@nestjs/config';
import { createUserDto, user } from '../../mock/user.mock';
import { mockService } from '../dependencies';
import { UsersController } from '../../../src/modules/users/controller/users.controller';
import { UsersService } from '../../../src/modules/users/service/users.service';
import { AuthModule } from '../../../src/modules/auth/auth.module';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), TestDatabaseModule, AuthModule],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('Create', () => {
    it('Should create a new user and return its data', async () => {
      jest.spyOn(mockService, 'create').mockReturnValue(user);
      const result = await controller.create(createUserDto);
      expect(result).toEqual(user);
      expect(mockService.create).toHaveBeenCalled();
      expect(mockService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('Should return all users', async () => {
      jest.spyOn(mockService, 'findAll').mockReturnValue([user]);
      const result = await controller.findAll();
      expect(result).toEqual([user]);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('Should return all users', async () => {
      jest.spyOn(mockService, 'findOne').mockReturnValue(user);
      const result = await controller.findOne(user.id);
      expect(result).toEqual(user);
      expect(mockService.findOne).toHaveBeenCalled();
      expect(mockService.findOne).toHaveBeenCalledWith(user.id);
    });
  });

  describe('destroy', () => {
    it('Should return all users', async () => {
      jest.spyOn(mockService, 'remove').mockReturnValue({});
      await controller.remove(user.id);
      expect(mockService.remove).toHaveBeenCalled();
      expect(mockService.remove).toHaveBeenCalledWith(user.id);
    });
  });
});
