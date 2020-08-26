// 查看自己的客户列表

import { Table,Button } from 'antd';
import React, { useState, useEffect } from 'react';
import API from '../../lib/API';
import User from '../../lib/user';
import Router from 'next/router';
import SearchBar from '../searchbar';
import Link from 'next/link';
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
        },
        {
            title: '操作',
            dataIndex: 'action',
        }
    ];

    const [disabled, setDisabled] = useState(true);
    function onChange(pagination, filters, sorter, extra) {
        // console.log('params', pagination, filters, sorter, extra);
        setPagination({...pagination});
        setUpdateCounter(updateCounter + 1);
        console.log('pagination: ', pagination);
    }
    // 存放数据。
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({current: 1, pageSize: 10, showSizeChanger: true});
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState();
    const [updateCounter, setUpdateCounter] = useState(0);

    const fetchData = () => {
        setLoading(true);
        API.getMyCustomer({pagesize: pagination.pageSize, page: pagination.current-1, id: User.getLoginId(), kw:searchValue})
            .then((res) => {
                console.log(res);
                if(res.data.code === 0 && res.data.datas){
                    setData(res.data.datas);
                    let data = [];
                    res.data.datas.forEach((e) => {
                        e['action'] = (
                            <div>
                                <Button type="primary" shape="round" size="small">
                                    <Link href={`/index/add?id=${e.key}`}><a>edit</a></Link>
                                </Button>
                                <Button disabled={disabled} type="danger" shape="round" size="small">
                                    <Link href={`/index/add?id=${e.key}`}><a>delete</a></Link>
                                </Button>
                            </div>
                        );
                        data.push(e);
                    });
                    // console.log(data);
                    setData(data);
                    console.log('http: pagination', pagination);
                    setPagination({
                        ...pagination,
                        page: updateCounter-1,
                        total: res.data.pager.rowcount
                    });
                    console.log('after -> http: pagination', pagination);

                }
                setLoading(false);
            }).catch(e => {
                alert("出错了，请重试");
                Router.push('/login');
            });
    }
    // 从服务器端获取数据
    useEffect(() => {
        // console.log('useEffect: pagination', pagination);
        // console.log('User.getLoginType():', User.getLoginType())
        if (User.getLoginType() == 1) {
            setDisabled(false);
        }
        fetchData();
    },[searchValue, updateCounter]);
    // 搜索功能
    function onSearch(value){
        setSearchValue(value);
    }
    return (
        <React.Fragment>
            <div style={{width:'30%'}}>
                <SearchBar 
                    placeHolder="serarch by name"
                    onSearch={onSearch}
                />
            </div>
            <br/>
            <Table 
                columns={columns} 
                dataSource={data} 
                onChange={onChange}
                style={{width: '100%', backgroundColor:'#fff'}}
                pagination={pagination}
                loading={loading}
            /> 
        </React.Fragment>
    )
}

export default MyCustomer;