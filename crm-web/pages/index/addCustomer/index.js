import EditCustomer from '../../../components/customer/editCustomer';
import MainLayout from '../../../components/layout/main';
import { useEffect } from 'react';
import User from '../../../lib/user';
import Router from 'next/router'
export default function Add(){
    useEffect(() => {
        if (User.getLoginType() == 2) {
            Router.push('/index/studentList');
        }
    })
    return <MainLayout Div={new EditCustomer()} />
}