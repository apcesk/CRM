import Axios from './Axios';
import Router from 'next/router';

class REST {

    static async get(url){
        let res;
        const axios = Axios.init();

        try {
            res = await axios.get(url);
            if (res.data.code !== 0) {
                return "出错了";
            }
            return res;
        } catch(e) {
            return e;
        }
    }

    static async post(url, req) {
        console.log('发送了post请求')
        let res;
        const axios = Axios.init();
        try {
            res = await axios.post(url, req);
            console.log('Rest -> post -> res: ', res);
            if (res.data.code !== 0) {
                return '出错了'
            }
            
            return res;
        } catch (e) {
            console.log('Rest -> post -> 报错: ', e);
            return e;
        }
    }
}

export default REST;