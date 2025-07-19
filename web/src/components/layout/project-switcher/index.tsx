import React, { useState, useEffect } from "react";
import { Avatar, Popover, Segmented, Button, List } from 'antd';
import { SwapOutlined, PlusOutlined } from '@ant-design/icons'
import { useSearchParams } from "react-router";

import CreateProjectModal from "../../create-project-modal";
import { fetchProjectList, type IProject } from "../../../api/project";
import { type IBaseContext } from "..";
import { EnvType } from "../../../api/group";
import css from './index.module.less'

interface IProjectSwitcher {
  collapsed: boolean;
  onChange: (v: IBaseContext) => void
}

const segmentedOptions = [
  {
    label: (
      <div style={{ padding: 4 }}>
        <Avatar style={{ backgroundColor: '#f5222d' }}>生产</Avatar>
      </div>
    ),
    value: EnvType.PROD,
  },
  {
    label: (
      <div style={{ padding: 4 }}>
        <Avatar style={{ backgroundColor: '#fa8c16' }}>预发布</Avatar>
      </div>
    ),
    value: EnvType.PRE,
  },
  {
    label: (
      <div style={{ padding: 4 }}>
        <Avatar style={{ backgroundColor: '#a0d911' }}>测试</Avatar>
      </div>
    ),
    value: EnvType.TEST,
  },
]

const ProjectSwitcher: React.FC<IProjectSwitcher> = ({ onChange, collapsed }) => {
  const [list, setList] = useState<IProject[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selected, setSelected] = useState<IProject>()
  const [env, setEnv] = useState<EnvType>()
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams()
  const [modalOpen, setModalOpen] = useState(false)

  const handleSelect = (project: IProject) => {
    setSelected(project)
    searchParams.set('id', String(project.id))
    setSearchParams(searchParams)
    setOpen(false)
  }

  const handleEnvChange = (value: EnvType) => {
    searchParams.set('env', value)
    setSearchParams(searchParams)
    setEnv(value)
  }

  const getProjectList = async () => {
    setLoading(true)
    const list = await fetchProjectList()
    setList(list)

    const id = searchParams.get('id')
    const defaultSelected = list.find(item => item.id === Number(id)) || list[0]
    if (defaultSelected) {
      searchParams.set('id', String(defaultSelected.id))
    } else {
      searchParams.delete('id')
    }

    setSearchParams(searchParams)
    setSelected(defaultSelected)
    setLoading(false)
  }

  const initEnv = () => {
    const env = searchParams.get('env') as EnvType
    if (!env || ![...Object.values(EnvType)].includes(env)) {
      searchParams.set('env', EnvType.PROD)
      setSearchParams(searchParams)
      setEnv(EnvType.PROD)
      return
    }
    setEnv(env)
  }

  const handleOpenCreate = () => {
    setOpen(false)
    setModalOpen(true)
  }

  const handleSubmitCreate = (project: IProject) => {
    setModalOpen(false)
    getProjectList()
    handleSelect(project)
  }

  const ProjetList = (
    <>
      <Button block onClick={handleOpenCreate}>新建项目</Button>
      <List
        className={css['project-list']}
        itemLayout="horizontal"
        dataSource={list}
        split={false}
        renderItem={item => (
          <List.Item className={css['project-item']} onClick={() => handleSelect(item)}>
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: '#13c2c2' }}>{item.nameCn[0]}</Avatar>}
              title={<span>{item.nameCn}</span>}
              description={<span className={css.ellipsis}>{item.description || '该项目没有填写备注'}</span>}
            />
          </List.Item>
        )}
      />
    </>
  )

  const envPptions = segmentedOptions.filter(item => {
    if (!collapsed) {
      return true
    }

    return item.value === env
  })

  useEffect(() => {
    if (env && selected) {
      onChange({ ...selected, env })
    }
  }, [env, selected, loading])

  useEffect(() => {
    initEnv()
    getProjectList()
  }, [])

  return <>
    <div className={css.project}>
      {list.length > 0 && selected ?
        <Popover
          placement="rightTop"
          content={ProjetList}
          open={open}
          onOpenChange={setOpen}
          trigger='click'
        >
          <Button block>
            {collapsed && <Avatar size="small" style={{ backgroundColor: '#13c2c2' }}>{selected.nameCn[0]}</Avatar>}
            {!collapsed && <span className={css.text}>{selected.nameCn}</span>}
            {!collapsed && <SwapOutlined />}
          </Button>
        </Popover> :
        <Button loading={loading} block onClick={handleOpenCreate}>
          {!collapsed && <span>{loading ? '项目加载中' : '创建项目'}</span>}
          <PlusOutlined />
        </Button>
      }
    </div>
    <div className={css.env}>
      <Segmented
        block={true}
        onChange={handleEnvChange}
        value={env}
        options={envPptions}
      />
    </div>
    <CreateProjectModal open={modalOpen} onSubmitSuccess={handleSubmitCreate} onCancel={() => setModalOpen(false)} />
  </>
}

export default ProjectSwitcher