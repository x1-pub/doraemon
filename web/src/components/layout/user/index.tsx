import React, { useEffect, useState } from "react";
import { Popover, Avatar, Divider } from 'antd'
import { MoreOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons'

import { fetchUserInfo, logout, type IUserInfo } from "../../../api/user";
import css from './index.module.less'

interface IUser {
  collapsed: boolean;
}
const User: React.FC<IUser> = ({ collapsed }) => {
  const [user, setUser] = useState<IUserInfo>()

  const getUserInfo = async () => {
    const info = await fetchUserInfo()
    setUser(info)
  }

  const handleLogout = async () => {
    await logout()
  }

  const UserPanel = <div className={css['user-panel']}>
    <span className={css.email}>{user?.email}</span>
    <div className={css.details}>
      <Avatar src={`https://sso-1251319111.cos.ap-beijing.myqcloud.com/${user?.name}.png`} />
      <div className={css['name-box']}>
        <span className={css.nameCn}>{user?.nameCn}</span>
        <span className={css.name}>{user?.name}</span>
      </div>
    </div>
    <Divider />
    <div className={css.handler}>
      <SettingOutlined />
      <span>设置</span>
    </div>
    <div className={css.handler} onClick={handleLogout}>
      <LogoutOutlined />
      <span>退出登录</span>
    </div>
  </div>

  useEffect(() => {
    getUserInfo()
  }, [])
  
  
  if (!user) {
    return null
  }

  return <div className={css.wrap}>
    <Popover placement="top" trigger="click" content={UserPanel}>
      <div className={css.popover} data-collapsed={collapsed}>
        <Avatar src={`https://sso-1251319111.cos.ap-beijing.myqcloud.com/${user?.name}.png`} />
        { !collapsed && <span className={css.name}>{user.nameCn}</span> }
        { !collapsed && <MoreOutlined /> }
      </div>
    </Popover>
  </div>
}

export default User