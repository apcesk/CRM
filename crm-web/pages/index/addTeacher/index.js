import AddTeacher from '../../../components/teacher/editTeacher';
import MainLayout from '../../../components/layout/main';
import { useEffect } from 'react';
import User from '../../../lib/user';
import Router from 'next/router'
export default function EditTeacher(){
    useEffect(() => {
        if (User.getLoginType() == 0) {
            Router.push('/index/mycustomer');
        }
    })
    return <MainLayout Div={new AddTeacher()} />
}