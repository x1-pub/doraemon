import { Form, Input, Modal, Radio } from "antd";
import React from "react";
import { message } from "antd";
import { createData, DataListResult, DataType } from "../../../api/data";
import TextEditor from "../../../components/text-editor";

type FieldType = {
  name: string;
  type: DataType;
  content?: string;
  desc?: string;
};

interface CreateGroupModalProps {
  groupId: number;
  open: boolean;
  onCancel: () => void;
  onSubmitSuccess: (values: DataListResult) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ groupId, open, onCancel, onSubmitSuccess }) => {
  const [form] = Form.useForm<FieldType>();
  const typeValue = Form.useWatch('type', form)

  const handleOk = async () => {
    const values = await form.validateFields()
    const data = await createData({
      groupId,
      ...values,
    })
    message.success('创建成功')
    onSubmitSuccess(data)
  }


  return (
    <Modal
      title="新增Key"
      open={open}
      maskClosable={false}
      onOk={handleOk}
      onCancel={onCancel}
      okText='提交'
      cancelText='取消'
      destroyOnClose
      width={750}
    >
      <Form preserve={false} form={form} autoComplete='off' labelCol={{ span: 2 }}>
        <Form.Item<FieldType>
          label="Key"
          name="name"
          rules={[
            { required: true, message: '请输入Key!' },
            {
              validator: (_, value) =>
                /^[a-z_0-9]+$/.test(value) ? Promise.resolve() : Promise.reject(new Error('Key只能为小写字母数字或下划线')),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="类型"
          name="type"
          initialValue={DataType.JSON}
        >
          <Radio.Group options={Object.values(DataType).map(value => ({ label: value.toLocaleUpperCase(), value }))} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Value"
          name="content"
          rules={[
            { required: true, message: '请输入Value!' },
            {
              validator: (_, value: string) => {
                if (!value || typeValue !== DataType.JSON) {
                  return Promise.resolve()
                }
                try {
                  JSON.parse(value)
                  return Promise.resolve()
                } catch {
                  return Promise.reject('json不合法')
                }
              }
            }
          ]}
        >
          <TextEditor type={typeValue} />
        </Form.Item>
        <Form.Item<FieldType>
          label="备注"
          name="desc"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateGroupModal
