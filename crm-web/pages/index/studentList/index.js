import StudentList from '../../../components/student/studentList';
import MainLayout from '../../../components/layout/main';
import { useEffect } from 'react';
import User from '../../../lib/user';
import Router from 'next/router'
export default function Index(){
    useEffect(() => {
        User.getLoginType() == 1 || User.getLoginType() == 2 ? '' : Router.push('index/mycustomer');
    },[])
    return <MainLayout Div={new StudentList()} />
}