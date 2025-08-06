import { Validator } from "@x1.pub/rui";

interface GetData {
  groupName: string;
}

export const GetDataDTO = (data) => new Validator({
  type: 'object',
  properties: {
    groupName: {
      type: 'string',
      required: true,
    },
  },
}).valid<GetData>(data)

