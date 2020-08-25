import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Appbreadcrumb from './appbreadcrumb';
import Link from 'next/link';
function MainLayout(props) {
  //
  const { SubMenu } = Menu;
  const { Header, Content, Footer, Sider } = Layout;
  const {Div} = props;
  console.log(Div);
  return (
    <Layout style={{height: '100vh'}}>
      <Header className="header">
        <div className="logo" style={{textAlign:'left', lineHeight:'100%', fontSize:'3.3rem', color:'#eee'}}>Lyra</div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Appbreadcrumb />
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200} style={{height:'60vh'}}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['客户管理']}
              style={{ height: '100%' }}
            >
              <SubMenu key="客户管理" icon={<UserOutlined />} title="客户管理">
                <Menu.Item key="1"><Link href="/index/mycustomer"><a>我的客户</a></Link></Menu.Item>
                <Menu.Item key="2"><Link href="/index/change"><a>修改关系</a></Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <React.Fragment>
            {props.Div}
          </React.Fragment>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }} className="create-by-apcesk">Lyra CRM</Footer>
    </Layout>
  );
  
}


export default MainLayout;