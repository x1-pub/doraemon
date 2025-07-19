import request from "../utils/request";

export enum EnvType {
  TEST = 'test',
  PRE = 'pre',
  PROD = 'prod',
}

export interface GroupTreeResult {
  id: number;
  projectId: number;
  parentId: number;
  env: EnvType;
  children: GroupTreeResult[]
  createdAt: Date;
  updatedAt: Date;
}

interface GroupTreeParams {
  projectId: number | string;
  env: EnvType;
}
export const fetchGroupTree = (params: GroupTreeParams) => request<GroupTreeResult[]>({
  method: 'GET',
  url: '/api/group/group_tree',
  params,
})

interface CreatGroupParams {
  env: EnvType;
  projectId: number;
  parentId?: number;
  name: string;
}
export const createGroup = (data: CreatGroupParams) => request<GroupTreeResult>({
  method: 'POST',
  url: '/api/group/create_group',
  data,
})
