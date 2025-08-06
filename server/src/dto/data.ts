import { Validator } from "@x1.pub/rui";

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
