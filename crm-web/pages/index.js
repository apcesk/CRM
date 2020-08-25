import {useEffect} from 'react'
import User from '../lib/user';
import Router from 'next/router';

const Home = () => {
    useEffect(() => {
      // 检查是否已经登录，没有登录则跳转到登录界面
      let isLogin = false;
      if (User.getToken()){
          isLogin = true;
          Router.push('/index')
      } else {
          isLogin = false;
          Router.push('/login');
      }
    }, [])
  return (<React.Fragment></React.Fragment>);
}

export default Home;
