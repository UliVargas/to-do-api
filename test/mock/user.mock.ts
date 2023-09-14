import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from '../../src/users/interfaces/user.interface';

export const createUserDto: CreateUserDto = {
  name: 'John',
  lastname: 'Doe',
  email: 'johndoe@email.com',
  password: 'Test123',
};

export const user: User = {
  id: 'user123',
  name: 'John',
  lastname: 'Doe',
  email: 'johndoe@email.com',
  isActive: true,
  createdAt: '2023-09-13T08:36:28.000Z',
  password: 'Test123',
  role: 'user',
};
