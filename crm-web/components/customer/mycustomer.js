// 查看自己的客户列表

import { Table, Button, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';
import API from '../../lib/API';
import User from '../../lib/user';
import Router from 'next/router';
import SearchBar from '../searchbar';
import Link from 'next/link';
// ReactDOM.render(<Table columns={columns} dataSource={data} onChange={onChange} />, mountNode);
function MyCustomer(){
    const columns = [
        {// id
            title: 'ID',
            dataIndex: 'key',
        },
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
    const [loginType, setLoginType] = useState(0);
    let disabled = true;
    function onChange(pagination, filters, sorter, extra) {
        setPagination({...pagination});
        setUpdateCounter(updateCounter + 1);
    }
    // 存放数据。
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({current: 1, pageSize: 10, showSizeChanger: true});
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState();
    const [updateCounter, setUpdateCounter] = useState(0);
    const deleteCustomer = (id) => {
        // 删除用户
        API.deleteCustomerById(id).then((res) => {
            fetchData();
        }).catch(e => {
            alert(`删除失败, Reason: ${e}`);
        })
    }
    // 获取客户信息
    const fetchData = () => {
        setLoading(true);
        API.getMyCustomer({pagesize: pagination.pageSize, page: pagination.current-1, id: User.getLoginId(), kw:searchValue, loginType: User.getLoginType()})
            .then((res) => {
                if(res.data.code === 0 && res.data.datas){
                    setData(res.data.datas);
                    let data = [];
                    if (User.getLoginType() == 1) {
                        disabled = false;
                    }
                    res.data.datas.forEach((e) => {
                        e['action'] = (
                            <div>
                                {/* 编辑按钮 */}
                                <Button type="primary" shape="round" size="small">
                                    <Link href={`/index/add?id=${e.key}`}><a>edit</a></Link>
                                </Button>
                                {/* 修改关系按钮 */}
                                <Button disabled={disabled} style={{display: disabled ? 'none' : 'inline'}} href={`/index/change?id=${e.key}`} type="danger" shape="round" size="small">
                                    change
                                </Button>
                                {/* 删除按钮 */}
                                <Popconfirm
                                    placement="rightBottom"
                                    title={"确认要删除？"}
                                    onConfirm={() => deleteCustomer(e.key)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button disabled={disabled} style={{display: disabled ? 'none' : 'inline'}} type="dashed" shape="round" size="small">
                                        delete
                                    </Button>
                                </Popconfirm>
                            </div>
                        );
                        data.push(e);
                    });
                    setData(data);
                    setPagination({
                        ...pagination,
                        page: updateCounter-1,
                        total: res.data.pager.rowcount
                    });
                }
                setLoading(false);
            }).catch(e => {
                alert(e);
                Router.push('/login');
            });
    }
    // 通过employee name 获取与其关联的客户
    const fetchDataByEmployeeName = (employeeName) => {
        setLoading(true);
        API.getCustomersByEmployeeName({pagesize: pagination.pageSize, page: 0, employeeName: employeeName})
            .then((res) => {
                console.log(res)
                if(res.data.code === 0 && res.data.datas && res.data.datas.error != true ){
                    setData(res.data.datas);
                    let data = [];
                    if (User.getLoginType() == 1) {
                        disabled = false;
                    }
                    res.data.datas.forEach((e) => {
                        e['action'] = (
                            <div>
                                {/* 编辑按钮 */}
                                <Button type="primary" shape="round" size="small">
                                    <Link href={`/index/add?id=${e.key}`}><a>edit</a></Link>
                                </Button>
                                {/* 修改关系按钮 */}
                                <Button disabled={disabled} style={{display: disabled ? 'none' : 'inline'}} href={`/index/change?id=${e.key}`} type="danger" shape="round" size="small">
                                    change
                                </Button>
                                {/* 删除按钮 */}
                                <Popconfirm
                                    placement="rightBottom"
                                    title={"确认要删除？"}
                                    onConfirm={() => deleteCustomer(e.key)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button disabled={disabled} style={{display: disabled ? 'none' : 'inline'}} type="dashed" shape="round" size="small">
                                        delete
                                    </Button>
                                </Popconfirm>
                            </div>
                        );
                        data.push(e);
                    });
                    setData(data);
                    const pager = res.data.pager;
                    setPagination({
                        page: pager.page,
                        pagesize: pager.pagesize,
                        total: pager.rowcount,
                        current: 1,
                        showSizeChanger: true
                    });
                } else {
                    alert(res.data.datas.msg);
                }
                setLoading(false);
            }).catch(e => {
                alert(e);
                Router.push('/login');
            });
    }
    // 获取登录类型
    useEffect(() => {
        setLoginType(User.getLoginType() == 1);
    }, [])
    // 从服务器端获取数据
    useEffect(() => {
        fetchData();
    },[searchValue, updateCounter]);
    // 通过搜索employee名来筛选客户
    const onEmployeeNameSearch = async (value) => {
        
        fetchDataByEmployeeName(value);
    }
    // 搜索功能，通过name筛选客户
    function onSearch(value){
        setSearchValue(value);
    }
    return (
        <React.Fragment>
            <div style={{width:'50%'}}>
                <div style={{display: 'flex'}}>
                    <SearchBar 
                        placeHolder="Serarch By Customer Name"
                        onSearch={onSearch}
                        style={{flex: '0.5'}}
                    />
                    {
                        loginType && 
                        <SearchBar 
                            placeHolder="Search By Employee Name"
                            onSearch={onEmployeeNameSearch}
                            style={{flex: '0.5',paddingLeft: '5px'}}
                        />
                    }
                </div>
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