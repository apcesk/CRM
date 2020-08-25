// 查看自己的客户列表

import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import API from '../../lib/API';
import User from '../../lib/user';

// ReactDOM.render(<Table columns={columns} dataSource={data} onChange={onChange} />, mountNode);
function MyCustomer(){
    const columns = [
        {// 名字
            title: 'Name',
            dataIndex: 'name',
        },
        {// 微信号
            title: 'WeChat',
            dataIndex: 'wechat',
        },
        {// 手机号
            title: 'Phone',
            dataIndex: 'phone',
        },
        {// 上次回访日期
            title: 'Review Date',
            dataIndex: 'last_review_date',
        },
        {// 地址/国籍
            title: 'Address',
            dataIndex: 'address',
        },
        {// 首次加入的日期
            title: 'Join Date',
            dataIndex: 'date_first_reg',
        },
        {
            title: '备注',
            dataIndex: 'remarks',
        }
    ];
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
        setPagination(pagination + 1);
    }
    // 存放数据。
    const [data, setData] = useState([
        {
            key: '1',
            name: 'Jim Red',
            wechat: 88,
            phone: 99,
            last_review_date: 89,
            address: '中国',
            date_first_reg: '' + new Date().getDate() + '-' + (new Date().getMonth()+1)+ '-' + new Date().getFullYear(),
            remarks:'备注'
        },
    ]);
    const [pagination, setPagination] = useState({current: 1, pagesize: 10, showSizeChanger: true});
    const [loading, setLoading] = useState(false);
    // 从服务器端获取数据
    useEffect(() => {
        setLoading(true);
        API.getMyCustomer({pagesize: pagination.pagesize, page: pagination.current-1, id: User.getLoginId()})
            .then((res) => {
                console.log(res);
                setData(res.data.datas);
                setLoading(false);
            }).catch(e => alert('错误,请刷新重试'));
    },[])
    return (
        <React.Fragment>
            <Table 
                columns={columns} 
                dataSource={data} 
                onChange={onChange}
                style={{width: '100%', minHeight:'60vh'}}
                pagination={pagination}
                loading={loading}
            /> 
        </React.Fragment>
    )
}

export default MyCustomer;