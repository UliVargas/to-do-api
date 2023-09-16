import { Test, TestingModule } from '@nestjs/testing';
import { TestDatabaseModule } from '../../test.module';
import { ConfigModule } from '@nestjs/config';
import { mockService } from '../dependencies';
import {  loginDto } from '../../mock/auth.mock';
import { AuthController } from '../../../src/modules/auth/auth.controller';
import { AuthService } from '../../../src/modules/auth/auth.service';

describe('UsersController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), TestDatabaseModule],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('defined', () => {
    expect(controller).toBeDefined()
  })

  // describe('login', () => {
  //   it('Should return the user information with the token', async () => {
  //     jest.spyOn(mockService, 'login').mockReturnValue(loginData);
  //     const result = await controller.login(loginDto);
  //     expect(result).toEqual(loginData);
  //     expect(mockService.login).toHaveBeenCalled();
  //     expect(mockService.login).toHaveBeenCalledWith(loginDto);
  //   });
  // });
});
