import Axios from './Axios';
import Router from 'next/router';

class REST {

    static async get(url){
        let res;
        const axios = Axios.init();

        try {
            res = await axios.get(url);
            if (res.data.code !== 0) {
                return res.data;
            }
            return res;
        } catch(e) {
            return e;
        }
    }

    static async post(url, req) {
        let res;
        const axios = Axios.init();
        try {
            res = await axios.post(url, req);
            if (res.data.code == 10) {
                Router.push('/index/mycustomer');
            }
            
            return res;
        } catch (e) {
            return e;
        }
    }
}

export default REST;