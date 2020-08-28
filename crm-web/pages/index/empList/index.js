import EmployeeList from '../../../components/employee/employeeList';
import MainLayout from '../../../components/layout/main';
import { useEffect } from 'react';
import User from '../../../lib/user';
import Router from 'next/router'
export default function Employeelist(){
    useEffect(() => {
        if (User.getLoginType() != 1) {
            Router.push('/index/mycustomer');
        }
    })
    return <MainLayout Div={new EmployeeList()} />
}