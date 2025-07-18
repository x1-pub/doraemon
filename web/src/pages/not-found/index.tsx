import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

import css from './index.module.less'

const NotFound: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className={css.wrap}>
      <Result
        status="404"
        title="404"
        subTitle="您访问的页面不存在"
        extra={
          <Button
            onClick={() => navigate('/')}
            variant="text"
            color="primary"
          >返回首页</Button>
        }
      />
    </div>
  )
};

export default NotFound;