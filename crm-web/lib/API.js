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
        return REST.post('service/login', req);
    }

    // 获取我的客户
    static getMyCustomer(req) {
        const query = objectToQuery(req);
        return REST.get(`service/getMyCustomer${query}`);
    }

    // 添加新的客户
    static addCustomer(req){
        return REST.post('service/addCustomer', req);
    }

    // 通过id获取用户
    static getCustomerById(req){
        return REST.get(`service/getCustomerById?cid=${req}`);
    }
    // 通过id删除用户
    static deleteCustomerById(id){
        return REST.post(`service/deleteCustomerById`, {cid:id});
    }
    // 用id获取用户的关系，（不写也可以）
    static getCustomerRelationShipeById(id){
        return REST.get(`service/getCustomerRelationShipeById?cid=${id}`)
    }
    // 获取所有的客服
    static getEmployeeList(){
        return REST.get(`employee/getEmployeeList`);
    }
    // 通过cid和eid来修改客户关系
    static changeRelationship(obj){
        return REST.post(`employee/changeRelationship`, obj);
    }
    // 通过名字获取客户的名字和id
    static getCustomerByName(name){
        return REST.get(`service/getCustomerByName?name=${name}`);
    }
    // 添加新职员
    static addEmployee(obj) {
        return REST.post(`employee/addEmployee`, obj);
    }
    // 通过id获取employee
    static getEmployeeById(eid) {
        return REST.get(`employee/getEmployeeById?eid=${eid}`);
    }

    // 通过id删除员工
    static deleteEmployeeById(id){
        return REST.post(`employee/deleteEmployeeById`, {id});
    }
    // 通过员工的name 获取他的客户
    static getCustomersByEmployeeName(req) {
        req.page = 0;
        const query = objectToQuery(req);
        console.log(query);
        return REST.get(`employee/getCustomersByEmployeeName${query}`);
    }
}

export default API;