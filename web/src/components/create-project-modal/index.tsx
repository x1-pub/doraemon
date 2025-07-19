import { Form, Input, Modal } from "antd";
import React from "react";
import { message } from "antd";

import { createProject } from "../../api/project";
import type { IProject } from "../../api/project";

type FieldType = {
  nameCn: string;
  name: string;
  description?: string;
};

interface CreateProjectModalProps {
  open: boolean;
  onSubmitSuccess: (values: IProject) => void;
  onCancel: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ open, onSubmitSuccess, onCancel }) => {
  const [form] = Form.useForm<FieldType>();

  const handleOk = async () => {
    const values = await form.validateFields()
    const project = await createProject(values)
    message.success('创建成功')
    onSubmitSuccess(project)
  }

  if (!open) {
    return null
  }

  return (
    <Modal
      title="新建项目"
      open={true}
      maskClosable={false}
      onOk={handleOk}
      onCancel={onCancel}
      okText='提交'
      cancelText='取消'
    >
      <Form preserve={false} form={form}>
        <Form.Item<FieldType>
          label="项目名称"
          name="nameCn"
          rules={[{ required: true, message: '请输入项目名称!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="项目标识"
          name="name"
          rules={[
            { required: true, message: '请输入项目标识!' },
            {
              validator: (_, value) =>
                /^[a-z_]+$/.test(value) ? Promise.resolve() : Promise.reject(new Error('项目标识只能为小写字母或下划线')),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="项目备注"
          name="description"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateProjectModal
