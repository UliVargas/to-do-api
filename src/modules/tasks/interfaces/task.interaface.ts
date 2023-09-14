import { User } from '../../users/interfaces/user.interface';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: number;
  status: number;
  endDate: string;
  createdAt: string;
  userId: string;
  user: User;
}
