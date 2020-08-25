import REST from './Rest';
import User from './user';
import ROuter from 'next/router';

// 把对象变成查询字符串
const objectToQuery = (param) => {
    if (!param) return '';
    return '?' + Object.keys(param).map((i) => {
        return i + '=' + param[i];
    }).join('&');
}

class API {
    // 登录方法
    static login(req){
        console.log('login...')
        return REST.post('service/login', req);
    }

    // 获取我的客户
    static getMyCustomer(req) {
        const query = objectToQuery(req);
        console.log(query);
        return REST.get(`service/getMyCustomer${query}`);
    }
}

export default API;