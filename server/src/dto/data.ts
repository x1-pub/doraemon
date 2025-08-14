import { Validator } from "@x1.pub/rui";
import { ColumnDataType } from "../models/data";

interface DataList {
  groupId: string;
  projectId: string;
}

export const DataListDTO = (data) => new Validator({
  type: 'object',
  properties: {
    projectId: {
      type: 'string',
      required: true,
    },
    groupId: {
      type: 'string',
      required: true,
    },
  },
}).valid<DataList>(data)

interface CreateData {
  groupId: number;
  name: string;
  type: string;
  content: string;
  desc: string;
}

export const CreateDataDTO = (data) => new Validator({
  type: 'object',
  properties: {
    groupId: {
      type: 'number',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    type: {
      type: 'string',
      enum: ['string', 'number', 'json'],
      required: true,
    },
    content: {
      type: 'string',
      required: true,
    },
    desc: {
      type: 'string',
    },
  },
}).valid<CreateData>(data)

interface DeleteData {
  dataId: number;
  projectId: number;
}

export const DeleteDataDTO = (data) => new Validator({
  type: 'object',
  properties: {
    dataId: {
      type: 'number',
      required: true,
    },
    projectId: {
      type: 'number',
      required: true,
    },
  },
}).valid<DeleteData>(data)

interface ModifyData {
  id: number;
  projectId: number;
  type: ColumnDataType;
  content: string;
  desc: string;
}

export const ModifyDataDTO = (data) => new Validator({
  type: 'object',
  properties: {
    id: {
      type: 'number',
      required: true,
    },
    projectId: {
      type: 'number',
      required: true,
    },
    type: {
      type: 'string',
      enum: ['string', 'number', 'json'],
      required: true,
    },
    content: {
      type: 'string',
      required: true,
      default: '',
    },
    desc: {
      type: 'string',
      required: true,
      default: '',
    },
  },
}).valid<ModifyData>(data)
