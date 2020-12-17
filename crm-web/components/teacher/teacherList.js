// 查看学生列表

import { Table, Button, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';
import API from '../../lib/API';
import User from '../../lib/user';
import Router from 'next/router';
import SearchBar from '../searchbar';
import Link from 'next/link';
function TeacherList(){
    const columns = [
        {// id
            title: 'ID',
            dataIndex: 'key',
        },
        {// 名字
            title: 'Name',
            dataIndex: 'name',
        },
        {// 手机号
            title: 'Phone',
            dataIndex: 'phone_number'
        },
        {
            title: '操作',
            dataIndex: 'action',
        }
    ];
    const [loginType, setLoginType] = useState(2);
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
    const deleteTeacher = (id) => {
        // 删除用户
        API.deleteTeacherById(id).then((res) => {
            fetchData();
        }).catch(e => {
            alert(`删除失败, Reason: ${e}`);
        })
    }
    // 获取所有的老师
    const fetchData = () => {
        setLoading(true);
        /**
         * @param {object} kw 指搜索关键字
         */
        API.getTeacherListPage({pagesize: pagination.pageSize, page: pagination.current-1, kw:searchValue})
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
                                    <Link href={`/index/addTeacher?id=${e.key}`}><a>edit</a></Link>
                                </Button>
                                {/* 删除按钮 */}
                                <Popconfirm
                                    placement="rightBottom"
                                    title={"确认要删除？"}
                                    onConfirm={() => deleteTeacher(e.key)}
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
    // 获取登录类型
    useEffect(() => {
        setLoginType(User.getLoginType() == 1);
    }, [])
    // 从服务器端获取数据
    useEffect(() => {
        fetchData();
    },[searchValue, updateCounter]);
    // 搜索功能，通过name筛选老师
    function onSearch(value){
        setSearchValue(value);
    }
    return (
        <React.Fragment>
            <div style={{width:'60%'}}>
                <div 
                    style={{display: 'flex'}}
                >
                    <SearchBar 
                        placeHolder="Serarch By Teacher Name"
                        onSearch={onSearch}
                    />
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

export default TeacherList;