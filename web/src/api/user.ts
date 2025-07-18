import request from "../utils/request";

export interface IUserInfo {
  id: number;
  name: string;
  nameCn: string;
  email: string;
}

export const fetchUserInfo = () => request<IUserInfo>({
  method: 'GET',
  url: '/api/user/user_info'
})

export const logout = () => request({
  method: 'POST',
  url: '/api/user/logout'
})