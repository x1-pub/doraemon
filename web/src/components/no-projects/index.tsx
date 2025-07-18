import React from "react";
import { Empty } from 'antd';

import css from './index.module.less'

const NoProjects: React.FC = () => {
  return <div className={css.wrap}>
    <Empty description={
      <span className={css.desc}>
        去
        <span className={css.create}>创建</span>
        第一个项目吧
      </span>}
    />
  </div>
}

export default NoProjects