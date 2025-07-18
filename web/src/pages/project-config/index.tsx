import React, { useEffect, useState } from "react";
import { Space, Table, TableProps, Tree, Typography, type TreeProps } from "antd";

import NoProjects from "../../components/no-projects";
import useProject from "../../hooks/use-project";
import { fetchGroupTree, type GroupTreeResult } from "../../api/group";
import { fetchDataList, type DataListResult } from "../../api/data";
import css from './index.module.less'

const ProjectConfig: React.FC = () => {
  const { env, id } = useProject()
  const [group, setGroup] = useState<GroupTreeResult[]>([])
  const [data, setData] = useState<DataListResult[]>([])
  const [_activeGroup, setActiveGroup] = useState<number>()

  const columns: TableProps<DataListResult>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 75,
      fixed: 'left',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Key',
      dataIndex: 'name',
      key: 'name',
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
      key: 'desc',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (_: any, _record: DataListResult) => {
        return (
          <Space>        
            <Typography.Link>
              编辑
            </Typography.Link>
            <Typography.Link>
              撤销
            </Typography.Link>
          </Space>
        )
      },
      width: 100,
      fixed: 'right',
    },
  ]

  const getGroup = async () => {
    if (!id || !env) {
      return
    }
    const data = await fetchGroupTree({ projectId: id, env })
    setGroup(data)
  }

  const getData = async (groupId: number) => {
    const list = await fetchDataList({ groupId })
    setData(list)
  }

  const handleGroupSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    const id = Number(selectedKeys[0])
    setActiveGroup(id)
    if (!info.node.children?.length) {
      getData(id)
    }
  }

  useEffect(() => {
    getGroup()
  }, [id, env])

  if (!id || !env) {
    return <NoProjects />
  }

  return <div className={css.configWrap}>
    <div className={css.treeWrap}>
      <Tree
        style={{ padding: '10px 0' }}
        fieldNames={{ title: 'name', key: 'id' }}
        treeData={group as any}
        onSelect={handleGroupSelect}
      />
    </div>
    <div className={css.contentWrap}>
      <Table<DataListResult>
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </div>
  </div>
}

export default ProjectConfig