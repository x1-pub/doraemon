import { Validator } from "@x1.pub/rui";

interface CreateProject {
  name: string;
  nameCn: string;
  description?: string;
}

export const CreateProjectDTO = (data) => new Validator({
  type: 'object',
  properties: {
    name: {
      type: 'string',
      le: 30,
      ge: 1,
      required: true,
    },
    nameCn: {
      type: 'string',
      le: 30,
      ge: 1,
      required: true,
    },
    description: {
      type: 'string',
      le: 200,
    },
  },
}).valid<CreateProject>(data)
