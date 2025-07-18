import request from "../utils/request";

export interface IProject {
  id: number;
  name: string;
  nameCn: string;
  appSecret: string;
  owner: number;
  admin: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export const fetchProjectList = () => request<IProject[]>({
  method: 'GET',
  url: '/api/project/project_list'
})
