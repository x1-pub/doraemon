import { Validator } from "@x1.pub/rui";

import { EnvType } from "../models/group";

interface GetData {
  env: EnvType;
  groupName: string;
}

export const GetDataDTO = (data) => new Validator({
  type: 'object',
  properties: {
    groupName: {
      type: 'string',
      required: true,
    },
    env: {
      type: 'string',
      enum: ['prod', 'pre', 'test']
    }
  },
}).valid<GetData>(data)

