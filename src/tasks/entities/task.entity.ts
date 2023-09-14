import { IsUUID } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Model,
  Table,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  Default,
  DataType,
} from 'sequelize-typescript';

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

@Table({
  tableName: 'Tasks',
  updatedAt: false,
})
export class Task extends Model {
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: '',
  })
  endDate: string;

  @Column
  status: number;

  @Column
  priority: number;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
