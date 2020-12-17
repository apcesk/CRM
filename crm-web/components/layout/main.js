import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Appbreadcrumb from './appbreadcrumb';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import User from '../../lib/user';
function MainLayout(props) {
  //
  const [ADD_CAN_VISIBLE, SET_ADD_CAN_VISIBLE] = useState(false);
  const [STU_LIST_VISIBLE, SET_STU_LIST_VISIBLE] = useState(false);
  const [CUS_CAN_VISIBLE, SET_CUS_CAN_VISIBLE] = useState(false);
  const { SubMenu } = Menu;
  const { Header, Content, Footer, Sider } = Layout;
  const [openKeys, setOpenKeys] = useState(['index']);
  const [selectKeys, setSelectKeys] = useState([]);
  const router = useRouter();
  const path = router.pathname;
  const asPath = router.asPath;
  const [AddOrEdit, setAddOrEdit] = useState('添加')
  const [AddOrEditEmployee, setAddOrEditEmployee] = useState('添加');
  const onOpenChange = (openKeys) => {
    setOpenKeys(openKeys);
  }
  useEffect(() => {
    SET_ADD_CAN_VISIBLE(User.getLoginType() == 1);
    SET_STU_LIST_VISIBLE(User.getLoginType() == 1 || User.getLoginType() == 2);
    SET_CUS_CAN_VISIBLE(User.getLoginType() == 0 || User.getLoginType() == 1);
    const OPEN_KEY = path.split('/')[1];
    const SELECT_KEY = path.split('/')[2];
    setOpenKeys(OPEN_KEY)
    setSelectKeys(SELECT_KEY);
    setAddOrEdit(asPath.includes('add?id=') ? "编辑" : '添加');
    setAddOrEditEmployee((asPath.includes('employee?id=')) ? "编辑" : '添加');

  }, [])
  return (
    <Layout style={{height: '100vh'}}>
      <Header className="header">
        <div className="logo" style={{textAlign:'left', lineHeight:'100%', fontSize:'3.3rem', color:'#eee'}}>Lyra</div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        
        <Appbreadcrumb />
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200} style={{height:'80vh'}}>
            <Menu
              mode="inline"
              defaultOpenKeys={openKeys}
              selectedKeys={selectKeys}
              style={{ height: '100%' }}
              onOpenChange={onOpenChange}
            >
              <SubMenu key="index" icon={<UserOutlined />} title="客户管理">
                <Menu.Item key="mycustomer" style={!CUS_CAN_VISIBLE ? {display:'none'} : {}}><Link href="/index/mycustomer"><a>我的客户</a></Link></Menu.Item>
                <Menu.Item key="addCustomer" style={!CUS_CAN_VISIBLE ? {display:'none'} : {}}><Link href="/index/addCustomer"><a>{AddOrEdit}客户</a></Link></Menu.Item>
                <Menu.Item key="employee" style={!ADD_CAN_VISIBLE ? {display:'none'} : {}}><Link href="/index/employee"><a>{AddOrEditEmployee}职员</a></Link></Menu.Item>
                <Menu.Item key="empList" style={!ADD_CAN_VISIBLE ? {display:'none'} : {}}><Link href="/index/empList"><a>职员列表</a></Link></Menu.Item>
                <Menu.Item key="studentList" style={!STU_LIST_VISIBLE ? {display:'none'} : {}}><Link href="/index/studentList"><a>学生列表</a></Link></Menu.Item>
                <Menu.Item key="editStudent" style={!STU_LIST_VISIBLE ? {display:'none'} : {}}><Link href="/index/editStudent"><a>添加学生</a></Link></Menu.Item>
                <Menu.Item key="teacherList" style={!ADD_CAN_VISIBLE ? {display:'none'} : {}}><Link href="/index/teacherList"><a>教师列表</a></Link></Menu.Item>
                <Menu.Item key="addTeacher" style={!ADD_CAN_VISIBLE ? {display:'none'} : {}}><Link href="/index/addTeacher"><a>添加教师</a></Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ backgroundColor:'#fff', height: "auto"}}>
            <React.Fragment>
              {props.Div}
            </React.Fragment>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }} className="create-by-apcesk">Lyra CRM</Footer>
    </Layout>
  );
  
}


export default MainLayout;