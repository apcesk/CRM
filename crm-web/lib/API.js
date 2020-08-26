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

    // 添加新的客户
    static addCustomer(req){
        console.log(req);
        return REST.post('service/addCustomer', req);
    }

    // 通过id获取用户
    static getCustomerById(req){
        console.log(req);
        return REST.get(`service/getCustomerById?cid=${req}`);
    }
}

export default API;