import { IsUUID } from 'class-validator';
import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Task } from '../../tasks/entities/task.entity';
import { capitalizarFirstLetter } from '../../../common/utils/capitalize-first-letter';

@Table({
  tableName: 'Users',
  updatedAt: false,
})
export class User extends Model {
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  lastname: string;

  @Unique(true)
  @Column('text')
  email: string;

  @Default(false)
  @Column('boolean')
  verifiedEmail: boolean;

  @Column('text')
  password: string;

  @Default('user')
  @Column('text')
  role: string;

  @Default(true)
  @Column('boolean')
  isActive: boolean;

  @HasMany(() => Task)
  tasks?: Task[];

  @BeforeUpdate
  @BeforeCreate
  static makeUpperCase(instance: User) {
    instance.name = capitalizarFirstLetter(instance.name).trim();
    instance.lastname = capitalizarFirstLetter(instance.lastname).trim();
    instance.email = instance.email.toLocaleLowerCase();
  }
}
