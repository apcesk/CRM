const ServiceWorkerModel = require('../model/serviceWorker');

// ServiceWorker 相关服务
const ServiceWorkerService = {
    checklogin: async (name, password) => {
        // 通过模型请求数据库获得结果，将请求的结果保存在data中
        const data = await ServiceWorkerModel.checkLogin(name, password);
        // 如果data有数据，并且查询到的结果数量大于0，则将结果返回出去，否则说明没有登录成功
        // console.log(data);
        return data && data.length ? data[0] : false;
    },
    getMyCustomer: async (page, pagesize, id) => {
        const data = await ServiceWorkerModel.getMyCustomer(page, pagesize, id);
        return data;
    }
}

module.exports = ServiceWorkerService;