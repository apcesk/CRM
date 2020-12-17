// 面包屑导航
import  {useState, useEffect} from 'react';
import Link from 'next/link'
import BreadTitle from '../../lib/breadcrumbTitle';
import { Breadcrumb, Typography } from 'antd';
import { useRouter } from 'next/router';
const { Title } = Typography;
function AppBreadcrumb() {
    const [breadcrumbName, setBreadcrumbName] = useState([]);
    const router = useRouter();
    const path = router.asPath;

    useEffect(() => {
        let secondaryPath = path.split('/')[2];
        let breadcrumbName = [];
        breadcrumbName.push(BreadTitle.getTitle(secondaryPath));
        setBreadcrumbName(breadcrumbName);

    },[]);

    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link href='/'>
                    <a><Title level={3} type='secondary' style={{display:'inline'}}>首页</Title></a>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item><Title level={3} type='warning' style={{display:'inline'}}>{breadcrumbName}</Title></Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default AppBreadcrumb;