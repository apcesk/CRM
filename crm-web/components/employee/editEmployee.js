import { Form, Input, Button, Select } from 'antd';
import User from '../../lib/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import API from '../../lib/API';
const {Option} = Select;
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

function EditEmployee() {
  const router = useRouter();
  const query = router.asPath;
  // const path = router.pathname;
  const [form] = Form.useForm();
  // 添加新职员
  const onFinish = async (values) => {
    console.log(values);
    API.addEmployee(values).then((res) => {
        console.log(res);
        if (res.data && res.data.code === 0) {
            form.setFieldsValue({});
            alert('操作成功');
        } else if(res.data && res.data.code === 99){
            alert(res.data.message);
        }
    }).catch(e => {
        alert(e);
    })
  };
  // 编辑职员
  useEffect(() => {
    if (query.includes('?') && query.includes('id')){
      // 从query中获取到id值
      // console.log('query: ', query);
      let eid = query.split('/')[2].split('=')[1];
      // 去服务器端获取数据
      API.getEmployeeById(eid).then((res) => {
          console.log(res);
          if (res.data && res.data.datas.length > 0 && res.data.code === 0){
            const data = res.data.datas[0];
            form.setFieldsValue({
                ename: data.ename,
                password: data.password,
                power: data.power
            })
          }
      }).catch(e => {
          alert(res.data);
      })
    } else {
        form.setFieldsValue({
            power: 0
        })
    }
  }, []);
  
  return (
      <React.Fragment>
        <Form 
          {...layout} 
          name="customer" 
          onFinish={onFinish} 
          validateMessages={validateMessages} 
          style={{paddingTop: '5%', paddingRight:'5%'}}
          form={form}
        >
            {/* 姓名用作登录 */}
            <Form.Item
                name={'ename'}
                label="Name"
                rules={[
                  {
                      required: true,
                  },
                ]}
            >
                <Input placeholder={"必填项"}/>
            </Form.Item>
            {/* 密码 */}
            <Form.Item
                name={'password'}
                label="Password"
                rules={[
                  {required:true}
                ]}
            >
                <Input type="passowrd" placeholder={"必填项"}/>
            </Form.Item>
            {/* 职位0普通,1管理员 */}
            <Form.Item
                name={ 'power'}
                label="Root"
            >
                <Select>
                    <Option value={1}>管理员</Option>
                    <Option value={0}>员工</Option>
                </Select>
            </Form.Item>
            {/* 职位 */}
            {/* <Form.Item name={'position'} label="Position">
                <Input placeholder='职位，可不填'/>
            </Form.Item> */}
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                提交
                </Button>
            </Form.Item>
        </Form>
    </React.Fragment>
  );
};

export default EditEmployee;