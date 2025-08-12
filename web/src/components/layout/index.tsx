import React, { useState, createContext } from "react";
import { useNavigate, Outlet, useLocation } from "react-router";
import { Menu, Spin, Layout, Avatar, type MenuProps } from 'antd';
import { ClusterOutlined, DashboardOutlined, LockOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SolutionOutlined } from "@ant-design/icons";

import ProjectSwitcher from "./project-switcher";
import User from "./user";
import { type IProject } from "../../api/project";
import logo from '../../assets/logo.png'
import css from './index.module.less'
import { EnvType } from "../../api/group";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    label: '详情',
    key: '/detail',
    icon: <DashboardOutlined />,
  },
  {
    label: '配置',
    key: '/config',
    icon: <ClusterOutlined />,
  },
  {
    label: '权限',
    key: '/permission',
    icon: <LockOutlined />,
  },
  {
    label: '任务',
    key: '/task',
    icon: <SolutionOutlined />,
  },
];

export interface IBaseContext extends Partial<IProject> {
  env?: EnvType;
  loading?: boolean;
  // uid: number;
  // name: string;
  // nameCn: string;
  // email: string;
}
export const BaseContext = createContext<IBaseContext>({});

const BaseLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [context, setContext] = useState<IBaseContext>({})
  const navigate = useNavigate()
  const location = useLocation();

  const handleClick: MenuProps['onClick'] = (e) => {
    navigate(`${e.key}${location.search}`)
  }

  const handleProjectChange = (params: IBaseContext) => {
    setContext(params)
  }

  return <Layout className={css.layout}>
    <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint="lg" theme="light">
      <div className={css.sider}>
        <div className={css.header} data-collapsed={collapsed}>
          <Avatar src={<img src={logo} alt="avatar" onClick={() => navigate('/')} />} />
          { !collapsed && (
            <>
              <span onClick={() => navigate('/')}>DORAEMON</span>
              <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
            </>
          ) }
        </div>
        <ProjectSwitcher collapsed={collapsed} onChange={handleProjectChange} />
        <Menu
          className={css.menu}
          onClick={handleClick}
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
        />
        { collapsed && <MenuUnfoldOutlined
            style={{ textAlign: 'center', display: 'block' }}
            onClick={() => setCollapsed(!collapsed)}
          />
        }
        <User collapsed={collapsed} />
      </div>
    </Sider>
    <Layout>
      <Content className={css.content}>
        { !context.loading ?
          <BaseContext.Provider value={context}>
            <Outlet />
          </BaseContext.Provider> :
          <div className={css['center-loading']}><Spin size="large" /></div>
        }
      </Content>
    </Layout>
  </Layout>
}

export default BaseLayout