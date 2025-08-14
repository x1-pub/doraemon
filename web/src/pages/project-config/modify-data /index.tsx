import { Form, Input, Modal, Radio } from "antd";
import React, { useEffect } from "react";
import { message } from "antd";
import { DataListResult, DataType, modifyData } from "../../../api/data";
import TextEditor from "../../../components/text-editor";
import { FieldType } from "../create-data";

interface ModifyDataModalProps {
  data: DataListResult;
  open: boolean;
  onCancel: () => void;
  onSubmitSuccess: (values: DataListResult) => void;
}

const ModifyDataModal: React.FC<ModifyDataModalProps> = ({ data, open, onCancel, onSubmitSuccess }) => {
  const [form] = Form.useForm<Required<FieldType>>();
  const typeValue = Form.useWatch('type', form)

  const handleOk = async () => {
    const values = await form.validateFields()
    const res = await modifyData({
      id: data.id,
      projectId: data.projectId,
      ...values,
    })
    message.success('修改成功')
    onSubmitSuccess(res)
  }

  useEffect(() => {
    if (open && form) {
      form.setFieldsValue(data)
    }
  }, [open])

  return (
    <Modal
      title="编辑"
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
        <Form.Item<FieldType> label="Key" name="name">
          <Input disabled />
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

export default ModifyDataModal
