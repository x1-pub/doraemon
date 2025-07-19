import { Button, Form, Input, Modal, Tooltip } from "antd";
import React, { useState } from "react";
import { message } from "antd";
import { createGroup, GroupTreeResult } from "../../../api/group";
import useProject from "../../../hooks/use-project";

type FieldType = {
  name: string;
};

interface CreateGroupModalProps {
  parentId?: number;
  disabled: boolean;
  onSubmitSuccess: (values: GroupTreeResult) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ disabled, parentId, onSubmitSuccess, }) => {
  const [form] = Form.useForm<FieldType>();
  const [open, setOpen] = useState(false)
  const { env, id } = useProject()

  const handleOk = async () => {
    if (!env || !id) {
      message.info('项目不存在')
      return
    }

    const values = await form.validateFields()
    const group = await createGroup({
      env,
      projectId: id,
      parentId: Number(parentId) || undefined,
      ...values,
    })
    message.success('创建成功')
    setOpen(false)
    onSubmitSuccess(group)
  }


  return (
    <>
      <Tooltip title={disabled ? '未选择父分组或该组中存在数据无法新建子分组' : null} placement="right">
        <Button block disabled={disabled} onClick={() => setOpen(true)}>新建子分组</Button>
      </Tooltip>

      <Modal
        title="新建子分组"
        open={open}
        maskClosable={false}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
        okText='提交'
        cancelText='取消'
        destroyOnClose
      >
        <Form preserve={false} form={form} autoComplete='off'>
          <Form.Item<FieldType>
            label="分组名"
            name="name"
            rules={[
              { required: true, message: '请输入分组名!' },
              {
                validator: (_, value) =>
                  /^[a-z_0-9]+$/.test(value) ? Promise.resolve() : Promise.reject(new Error('分组名只能为小写字母数字或下划线')),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreateGroupModal
