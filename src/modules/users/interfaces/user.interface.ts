export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: string;
  isActive: boolean;
  role: string;
  tasks?: string[];
}
