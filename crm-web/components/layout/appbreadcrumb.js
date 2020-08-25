// 面包屑导航
import  {useState, useEffect} from 'react';
import Link from 'next/link'

import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';

function AppBreadcrumb() {
    const [breadcrumbName, setBreadcrumbName] = useState([]);
    const router = useRouter();
    const path = router.pathname;

    useEffect(() => {
        const query = router.query;
        console.log(query);
    },[]);

    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link href='/'>
                    <a>首页</a>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumbName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default AppBreadcrumb;