import {
  Table,
  Model,
  Column,
  AllowNull,
  ForeignKey,
  Default,
  DataType,
  BeforeCreate,
} from 'sequelize-typescript';

import Group, { EnvType } from './group';
import Project from './project';

export enum ColumnDataType {
  STRING = 'string',
  NUMBER = 'number',
  JSON = 'json',
}

@Table({
  tableName: 't_data',
  timestamps: true,
  paranoid: true,
  // indexes: [
  //   {
  //     name: 'unique_groupId_name',
  //     unique: true,
  //     fields: ['isLatest', 'groupId', 'name'],
  //   },
  // ],
})
export default class Data extends Model {
  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @ForeignKey(() => Group)
  @Column
  groupId: number;

  @Column({
    type: DataType.ENUM(...Object.values(EnvType)),
    allowNull: false,
  })
  env: EnvType;

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

  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  entityId: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isLatest: boolean;

  @AllowNull(false)
  @Default(0)
  @Column
  version: number;

  @BeforeCreate
  static initVersion(instance: Data) {
    if (!instance.version) {
      instance.version = 1;
    }
    instance.isLatest = true;
  }

  async updateWithVersion(data: Partial<Data>): Promise<Data> {
    this.isLatest = false;
    await this.save();

    const newVersion = await Data.create({
      ...this.get({ plain: true }),
      ...data,
      id: null,
      version: this.version + 1,
      isLatest: true,
    });

    return newVersion;
  }

  static async findAllVersions(entityId: number): Promise<Data[]> {
    return this.findAll({
      where: { entityId },
      order: [['version', 'ASC']]
    });
  }
}
