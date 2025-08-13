import React, { useEffect, useMemo, useState } from "react";
import { Button, Empty, message, Popconfirm, Space, Table, TableProps, Tree, Typography, type TreeProps } from "antd";

import NoProjects from "../../components/no-projects";
import useProject from "../../hooks/use-project";
import { fetchGroupTree, type GroupTreeResult } from "../../api/group";
import { deleteData, fetchDataList, type DataListResult } from "../../api/data";
import CreateGroupModal from "./create-group";
import CreateDataModal from "./create-data";
import css from './index.module.less'
import { preloadMonacoEditor } from "../../utils/monaco-loader";
import { QuestionCircleOutlined } from "@ant-design/icons";

preloadMonacoEditor()

const columns: TableProps<DataListResult>['columns'] = [
  {
    title: 'Key',
    dataIndex: 'name',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: 'Value',
    dataIndex: 'content',
    render: (value: string) => {
      if (value.length < 30) {
        return value
      }
      return (
        <Space>
          <span>{`${value.slice(0, 20)}...`}</span>
          <Typography.Link>
            查看
          </Typography.Link>
        </Space>
      )
    },
  },
  {
    title: '描述',
    dataIndex: 'desc',
  },
  {
    title: '版本',
    dataIndex: 'version',
  },
]

const TREE_ROOT_GROUP_ID = 0

const ProjectConfig: React.FC = () => {
  const { env, id } = useProject()
  const [group, setGroup] = useState<GroupTreeResult[]>([])
  const [data, setData] = useState<DataListResult[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [activeGroup, setActiveGroup] = useState<GroupTreeResult>()
  const [createDataOpen, setCreateDataOpen] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const isActiveLeafGroup = !!activeGroup && !activeGroup?.children?.length

  const getGroup = async () => {
    if (!id || !env) {
      return
    }
    const data = await fetchGroupTree({ projectId: id, env })
    setGroup(data)
  }

  const getData = async (groupId: number) => {
    setLoading(true)
    const list = await fetchDataList({ groupId, projectId: id! })
    setData(list)
    setLoading(false)
  }

  const handleGroupSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    const id = Number(selectedKeys[0])
    setActiveGroup(info.node as unknown as GroupTreeResult)
    if (!info.node.children?.length) {
      getData(id)
    }
    setSelectedRowKeys([])
  }

  const handleCreateDataSuccess = () => {
    getData(activeGroup?.id!)
    setCreateDataOpen(false)
  }

  const handleDelete = async (row: DataListResult) => {
    await deleteData({ dataId: row.id, projectId: row.projectId })
    getData(row.groupId)
    message.success('删除成功')
  }

  const actionColumn: TableProps<DataListResult>['columns'] = useMemo(() => {
    return [
      {
        title: '操作',
        dataIndex: 'id',
        render: (_v, r) => {
          return (
            <Space>
              <Typography.Link>编辑</Typography.Link>
              <Popconfirm
                title='警告'
                description='删除后数据不可恢复，确认继续删除吗？'
                okText='确认删除'
                cancelText='取消'
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={() => handleDelete(r)}
              >
                <Typography.Link type="danger">删除</Typography.Link>
              </Popconfirm>
            </Space>
          )
        },
        width: 100,
        fixed: 'right',
      }
    ]
  }, [])

  useEffect(() => {
    setActiveGroup(undefined)
    getGroup()
  }, [id, env])

  if (!id || !env) {
    return <NoProjects />
  }

  return <div className={css.configWrap}>
    <div className={css.treeWrap}>
      <CreateGroupModal
        disabled={(!activeGroup?.id && activeGroup?.id !== TREE_ROOT_GROUP_ID) || loading || (isActiveLeafGroup && data.length > 0)}
        parentId={activeGroup?.id}
        onSubmitSuccess={() => getGroup()}
      />
      <Tree.DirectoryTree
        style={{ padding: '10px 0' }}
        fieldNames={{ title: 'name', key: 'id' }}
        // @ts-expect-error 添加一层根目录
        treeData={[{ id: TREE_ROOT_GROUP_ID, name: '根分组', children: group }]}
        onSelect={handleGroupSelect}
        blockNode
        selectedKeys={activeGroup ? [activeGroup.id] : []}
        showLine
        showIcon={false}
        defaultExpandedKeys={[TREE_ROOT_GROUP_ID]}
      />
    </div>
    <div className={css.contentWrap}>
      {!isActiveLeafGroup || activeGroup.id === TREE_ROOT_GROUP_ID ? <Empty className={css.empty} description="请先选择左侧分组" /> : (
        <>
          <div className={css.buttonGroup}>
            <Button onClick={() => setCreateDataOpen(true)}>新增Key</Button>
            <Button>发布</Button>
          </div>
          <Table<DataListResult>
            rowKey="id"
            columns={[...columns, ...actionColumn]}
            dataSource={data}
            pagination={false}
            scroll={{ x: 'max-content' }}
            loading={loading}
            rowSelection={{
              selectedRowKeys,
              onChange: (keys: React.Key[]) => setSelectedRowKeys(keys)
            }}
          />
        </>
      )}
    </div>
    <CreateDataModal
      open={createDataOpen}
      groupId={activeGroup?.id!}
      onCancel={() => setCreateDataOpen(false)}
      onSubmitSuccess={handleCreateDataSuccess} />
  </div>
}

export default ProjectConfig