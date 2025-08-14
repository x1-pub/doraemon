import { Validator } from "@x1.pub/rui";

import { EnvType } from "../models/group";

interface GetData {
  env: EnvType;
  groupName: string;
  key?: string;
}

export const GetDataDTO = (data) => new Validator({
  type: 'object',
  properties: {
    groupName: {
      type: 'string',
      required: true,
    },
    key: {
      type: 'string',
    },
    env: {
      type: 'string',
      enum: ['prod', 'pre', 'test']
    }
  },
}).valid<GetData>(data)

