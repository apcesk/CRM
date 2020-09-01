import { Form, Input, Button, DatePicker,Select } from 'antd';
import User from '../../lib/user';
import { useRouter, Router } from 'next/router';
import { useEffect, useState } from 'react';
import API from '../../lib/API';
import moment from 'moment';
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const validateMessages = {
  required: '${label} 是必填项',
  types: {
    email: '${label} 不合法的邮箱',
    number: '${label} 不合法的数字',
    string: '${label} 不合法的手机号'
  },
  number: {
    range: '${label} 必须在 ${min} 和 ${max} 之间',
  },
  string: {
    len:'${label} 长度必须在 ${min} 和 ${max} 之间'
  }
};

function EditStudent() {
  const router = useRouter();
  const query = router.asPath;
  // const path = router.pathname;
  const [form] = Form.useForm();
  // 添加新教师
  const onFinish = async (values) => {
    // 将修改的老师id传过去
    if (query.includes('?') && query.includes('id')){
      // 从query中获取到id值
      let tid = query.split('/')[2].split('=')[1];
      values.tid = tid;
    }
    // 将表单数据添加到数据库
    API.addTeacher(values).then((res) => {
      if(res.data.datas.code === 99) {
        alert(res.data.datas.message); 
      } else {
        // 操作成功
        alert('操作成功')
        form.resetFields();
      }
    }).catch((e) => {
      alert(e);
    });
  };
  // 编辑教师
  useEffect(() => {
    if (query.includes('?') && query.includes('id')){
      // 从query中获取到id值
      let tid = query.split('/')[2].split('=')[1];
      // 去服务器端获取数据
      API.getTeacherById(tid).then((res) => {
        const teacher = res.data.datas[0];
        const { name, phone_number} = teacher;

        form.setFieldsValue({
          name,
          phone_number
        })
      }).catch(e => {
        alert(e);
      })
    }
  }, []);

  
  return (
      <React.Fragment>
        <Form 
          {...layout} 
          name="student" 
          onFinish={onFinish} 
          validateMessages={validateMessages} 
          style={{paddingTop: '5%', paddingRight:'5%'}}
          form={form}
        >
            {/* 姓名 */}
            <Form.Item
                name={'name'}
                label="Name"
                rules={[
                  {
                      required: true,
                  },
                ]}
            >
                <Input placeholder={"必填项"}/>
            </Form.Item>
            {/* 手机号 */}
            <Form.Item
                name={ 'phone_number'}
                label="Phone"
                rules={[
                  {
                      type: 'string',
                      min: 8,
                      max: 11,
                  },
                  {
                    required: true,
                  }
                ]}
            >
                <Input placeholder={"必填项"}/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                提交
                </Button>
            </Form.Item>
        </Form>
    </React.Fragment>
  );
};

export default EditStudent;