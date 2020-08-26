// 搜索小组件
import React from 'react';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function SearchBar (props){
    const { onSearch, placeHolder } = props;
    return (
        <React.Fragment>
            <div>
            <Search
                placeholder={placeHolder}
                onSearch={onSearch}
                enterButton
            />
            </div>
        </React.Fragment>
    )
}
  