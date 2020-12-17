import { Form, Input, Button, Select } from 'antd';
import User from '../../lib/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import API from '../../lib/API';
import moment from 'moment';
import SearchBar from '../searchbar';
const { Option } = Select;
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

  // let [employees,] = [];

  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const query = router.asPath;
  const [form] = Form.useForm();
  const [selectValue, setSelectValue] = useState('');
  // 修改客户关系，传入eid和cid即可
  const onFinish = async (values) => {
    // 通过ename查找到employee的eid，
    API.changeRelationship(values).then(res => {

    }).catch(e => {
      alert(e);
    })
  };
  // 通过id查询客户关系
  const fetchRelationShipData = () => {
    let cid = parseInt(query.split('/')[2].split('=')[1]);
    
    // 通过cid获取客户的name
    API.getCustomerRelationShipeById(cid).then((res) => {
        let data = res.data.datas[0];
        form.setFieldsValue({
            eid: data.eid,
            cname: data.cname,
            cid: data.cid
        })
    }).catch(e => {
        alert(e);
    })
  };
  // 通过名字搜索指定的客户
  const onSearch = (value) => {
    API.getCustomerByName(value).then((res) => {
      if (res.data.datas.length > 0 && res.data.code === 0) {
        form.setFieldsValue({
          cid: res.data.datas[0].cid,
          cname: res.data.datas[0].cname,
          eid: res.data.datas[0].eid
        });
        setSelectValue(res.data.datas[0].eid);
      } else {
        alert('查无此人')
      }
    }).catch(e => {
      alert(e);
    })
  }
  // 获取客服列表
  const getEmployeeList = () => {
      API.getEmployeeList().then((res) => {
          let data = res.data.datas;
          let tmpEmployee = [];
          if (res.data && res.data.code === 0) {
            data.forEach(e => {
              tmpEmployee.push({'label': e.name, 'value': e.key});
            });
          };
          setEmployees(tmpEmployee);
      }).catch(e => {
          alert(e);
      })
  }
  useEffect(() => {
    fetchRelationShipData();
    getEmployeeList();
  }, [])
  return (
      <React.Fragment>
        <div style={{width:'30%'}}>
                <SearchBar 
                    placeHolder="serarch by Customer ID"
                    onSearch={onSearch}
                />
            </div>
        <Form 
          {...layout} 
          name="customer" 
          onFinish={onFinish} 
          validateMessages={validateMessages} 
          style={{paddingTop: '5%', paddingRight:'5%'}}
          form={form}
        >
            {/* 客户姓名 */}
            <Form.Item
                name={'cname'}
                label="Customer Name"
                rules={[
                  {
                      required: true,
                  },
                ]}
            >
                <Input disabled={true} style={{color:'red'}}/>
            </Form.Item>
            {/* 客户id */}
            <Form.Item
                name={'cid'}
                label="Customer ID"
                rules={[
                  {
                      required: true,
                  },
                ]}
            >
                <Input disabled={true} style={{color:'red'}}/>
            </Form.Item>
            {/* 对应的员工name */}
            <Form.Item
                name={'eid'}
                label="Employee Name"
                rules={[
                  {
                      required: true,
                  },
                ]}
            >
                {/* <Input placeholder={"必填项"}/> */}
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    options={employees}
                    value={selectValue}
                    filterOption={(input, option) =>{
                      // option 指代所有的选项
                        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                      } 
                    }
                >
                </Select>
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