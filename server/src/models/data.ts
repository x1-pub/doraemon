import {
  Table,
  Model,
  Column,
  AllowNull,
  ForeignKey,
  Default,
  DataType,
} from 'sequelize-typescript';

import Group from './group';
import Project from './project';

enum ColumnDataType {
  STRING = 'string',
  NUMBER = 'number',
  JSON = 'json',
}

@Table({
  tableName: 't_data',
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      name: 'unique_groupId_name',
      unique: true,
      fields: ['groupId', 'name'],
    },
  ],
})
export default class Data extends Model {
  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @ForeignKey(() => Group)
  @Column
  groupId: number;

  @AllowNull(false)
  @Column
  groupName: string;

  @Column({
    type: DataType.ENUM(...Object.values(ColumnDataType)),
    allowNull: false,
  })
  type: ColumnDataType;

  @AllowNull(false)
  @Column
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  content: string;

  @Default('')
  @Column
  desc: string;

  @AllowNull(false)
  @Default(0)
  @Column
  version: number;
}
