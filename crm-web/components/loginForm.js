import { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Router from 'next/router';
import User from '../lib/user';
import API from '../lib/API';
const { Title } = Typography;

const NormalLoginForm = () => {
  // 发送请求
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    let data;
    API.login(values).then((res) => {

      data = res.data && res.data.datas;
      console.log(data);
      if (data && data.code === 0) {
        User.saveToken(data.token);
        User.saveLoginType(data.login_type);
        User.saveLoginId(data.info.id);
        Router.push('/index/mycustomer');
      } else {
        alert('登录失败');
      }
    });
  };
  const [form] = Form.useForm();
  return (
    <React.Fragment>
      <div style={{width: '30%', margin:'0 auto', paddingTop: '5%'}}>
        <Form
          
          name="login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          form={form}
        >
          <Title style={{textAlign: 'center'}}>Lyra CRM</Title>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button style={{width: '100%'}} type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
};

// ReactDOM.render(<NormalLoginForm />, mountNode);
export default NormalLoginForm;