import { Validator } from "@x1.pub/rui";

interface GroupTree {
  projectId: string;
  env: string;
}

export const GroupTreeDTO = (data) => new Validator({
  type: 'object',
  properties: {
    projectId: {
      type: 'string',
      required: true,
    },
    env: {
      type: 'string',
      enum: ['test', 'pre', 'prod'],
      required: true,
    },
  },
}).valid<GroupTree>(data)

interface CreateGroup {
  parentId: number;
  projectId: number;
  name: string;
  env: string;
}

export const CreateGroupDTO = (data) => new Validator({
  type: 'object',
  properties: {
    projectId: {
      type: 'number',
      ge: 1,
      required: true,
    },
    parentId: {
      type: 'number',
      ge: 1,
    },
    env: {
      type: 'string',
      enum: ['test', 'pre', 'prod'],
      required: true,
    },
    name: {
      type: 'string',
      le: 20,
      required: true,
    },
  },
}).valid<CreateGroup>(data)
