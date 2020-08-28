// 查看员工列表

import { Table, Button, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';
import API from '../../lib/API';
import User from '../../lib/user';
import Router from 'next/router';
import SearchBar from '../searchbar';
import Link from 'next/link';
// ReactDOM.render(<Table columns={columns} dataSource={data} onChange={onChange} />, mountNode);
function EmployeeList(){
    const columns = [
        {// id
            title: 'ID',
            dataIndex: 'key',
        },
        {// 名字
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: '操作',
            dataIndex: 'action',
        }
    ];

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
    const deleteEmployee = (id) => {
        console.log(id);
        // 删除用户
        API.deleteEmployeeById(id).then((res) => {
            console.log(res);
            fetchData();
        }).catch(e => {
            alert('删除失败')
        })
    }
    const fetchData = () => {
        setLoading(true);
        API.getEmployeeList({pagesize: pagination.pageSize, page: pagination.current-1, id: User.getLoginId(), kw:searchValue, loginType: User.getLoginType()})
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
                                    <Link href={`/index/employee?id=${e.key}`}><a>edit</a></Link>
                                </Button>
                                {/* 删除按钮 */}
                                <Popconfirm
                                    placement="rightBottom"
                                    title={"确认要删除？"}
                                    onConfirm={() => deleteEmployee(e.key)}
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

    // 从服务器端获取数据
    useEffect(() => {
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

export default EmployeeList;