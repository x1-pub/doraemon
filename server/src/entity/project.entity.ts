import {
  Table,
  Model,
  AllowNull,
  Unique,
  Column,
  DataType,
  Default,
  HasMany,
} from 'sequelize-typescript';

import { Group } from './group.entity';

@Table({
  tableName: 't_project',
  timestamps: true,
  paranoid: true,
})
export class Project extends Model {
  @HasMany(() => Group)
  groups: Group[];

  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @AllowNull(false)
  @Column
  nameCn: string;

  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column
  appSecret: string;

  @AllowNull(false)
  @Column
  owner: number;

  @Column
  admin: string;

  @Column
  description: string;
}
