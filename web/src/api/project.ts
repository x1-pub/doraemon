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

interface CreateProjectParams {
  nameCn: string;
  name: string;
  description?: string;
}

export const fetchProjectList = () => request<IProject[]>({
  method: 'GET',
  url: '/api/project/project_list'
})

export const createProject = (data: CreateProjectParams) => request<IProject>({
  method: 'POST',
  url: '/api/project/create_project',
  data,
})
