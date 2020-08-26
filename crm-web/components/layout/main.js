import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Appbreadcrumb from './appbreadcrumb';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
function MainLayout(props) {
  //
  const { SubMenu } = Menu;
  const { Header, Content, Footer, Sider } = Layout;
  const [openKeys, setOpenKeys] = useState(['index']);
  const [selectKeys, setSelectKeys] = useState([]);
  const router = useRouter();
  const path = router.pathname;
  const asPath = router.asPath;
  const [AddOrEdit, setAddOrEdit] = useState('添加')
  const onOpenChange = (openKeys) => {
    setOpenKeys(openKeys);
  }
  useEffect(() => {
    const OPEN_KEY = path.split('/')[1];
    const SELECT_KEY = path.split('/')[2];
    setOpenKeys(OPEN_KEY)
    setSelectKeys(SELECT_KEY);
    setAddOrEdit(asPath.includes('add?id=') ? "编辑" : '添加');
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
                <Menu.Item key="mycustomer"><Link href="/index/mycustomer"><a>我的客户</a></Link></Menu.Item>
                <Menu.Item key="add"><Link href="/index/add"><a>{AddOrEdit}客户</a></Link></Menu.Item>
                <Menu.Item key="change"><Link href="/index/change"><a>修改关系</a></Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{height:'80vh', maxHeight:'80vh', backgroundColor:'#fff'}}>
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