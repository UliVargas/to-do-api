import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Status {
  todo,
  doing,
  done,
}

export enum Priority {
  low,
  medium,
  high,
}

@Entity({
  name: 'Tasks',
})
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @CreateDateColumn()
  createdAt: string;

  @Column({
    type: Date,
  })
  @IsNotEmpty()
  endDate: string;

  @Column({
    enum: Status,
    default: Status.todo,
  })
  status: number;

  @Column({
    enum: Priority,
    default: Priority.low,
  })
  priority: number;
}
