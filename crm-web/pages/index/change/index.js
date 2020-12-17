import Change from '../../../components/customer/change';
import MainLayout from '../../../components/layout/main';
import { useEffect } from 'react';
import User from '../../../lib/user';
export default function Index(){
    useEffect(() => {
        if (User.getLoginType() != 1) {
            Router.push('/index/mycustomer');
        }
    })
    return <MainLayout Div={new Change()} />
}