import { Form, Input, Button, DatePicker } from 'antd';
import User from '../../lib/user';
import { useRouter } from 'next/router';
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

function EditCustomer() {
  const router = useRouter();
  const query = router.asPath;
  // const path = router.pathname;
  const [form] = Form.useForm();
  // 添加新客户
  const onFinish = async (values) => {
    values.date_first_reg = values.date_first_reg.format('YYYY-MM-DD');
    const userId = User.getLoginId();
    values.service_id = parseInt(userId);
    // console.log(values);
    // 将表单数据添加到数据库
    API.addCustomer(values).then((res) => {
      // console.log(res);
      if(res.data.code === 0) {
        alert('添加成功');
        form.setFieldsValue({});
      }
    }).catch((e) => {
      alert(e);
    });
  };
  // 编辑客户
  useEffect(() => {
    if (query.includes('?') && query.includes('id')){
      // 从query中获取到id值
      // console.log('query: ', query);
      let cid = query.split('/')[2].split('=')[1];
      // 去服务器端获取数据
      API.getCustomerById(cid).then((res) => {
        // console.log(res);
        const customer = res.data.datas[0];
        const { name, wechat, phone_number, address, date_first_reg, remarks} = customer;
        console.log(date_first_reg);
        let date_first_reg1 = moment(date_first_reg);
        console.log(date_first_reg1);
        form.setFieldsValue({
          name,
          wechat,
          phone_number,
          address,
          date_first_reg: date_first_reg1,
          remarks
        })
      }).catch(e => {
        alert(e);
      })
    }
  }, []);
  const disabledDate = (current) => {
    return current < moment().startOf('day');
  }

  
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
            {/* 微信号 */}
            <Form.Item
                name={'wechat'}
                label="WeChat"
                rules={[
                  {required:true}
                ]}
            >
                <Input placeholder={"没有请填null"}/>
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
            {/* 住址 */}
            <Form.Item name={'address'} label="Address">
                <Input />
            </Form.Item>
            {/* 创建日期 */}
            <Form.Item name={'date_first_reg'} label="注册日期">
              <DatePicker placeholder={"首次添加日期请选择今日"} onChange={e=>{console.log(e)}}
                disabledDate={disabledDate}
              />
            </Form.Item>
            {/* 备注 */}
            <Form.Item name={ 'remarks'} label="remarks">
              <Input.TextArea placeholder={"备注说明"}/>
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

export default EditCustomer;