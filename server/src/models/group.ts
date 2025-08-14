import {
  Table,
  Model,
  Column,
  AllowNull,
  ForeignKey,
  HasMany,
  DataType,
} from 'sequelize-typescript';

import Project from './project';

export enum EnvType {
  TEST = 'test',
  PRE = 'pre',
  PROD = 'prod',
}
@Table({
  tableName: 't_group',
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      name: 'unique_projectId_parentId_name',
      unique: true,
      fields: ['projectId', 'parentId', 'env', 'name'],
    },
  ],
})
export default class Group extends Model {
  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @HasMany(() => Group, 'parentId')
  children: Group;

  @AllowNull(true)
  @ForeignKey(() => Group)
  @Column
  parentId: number;

  @Column({
    type: DataType.ENUM(...Object.values(EnvType)),
    allowNull: false,
  })
  env: EnvType;

  @AllowNull(false)
  @Column
  name: string;
}
