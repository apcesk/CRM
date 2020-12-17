const ServiceWorkerModel = require('../model/serviceWorker');

// ServiceWorker 相关服务
const ServiceWorkerService = {
    checklogin: async (name, password) => {
        // 通过模型请求数据库获得结果，将请求的结果保存在data中
        const data = await ServiceWorkerModel.checkLogin(name, password);
        // 如果data有数据，并且查询到的结果数量大于0，则将结果返回出去，否则说明没有登录成功
        return data && data.length ? data[0] : false;
    },
    getMyCustomer: async ({page, pagesize, id, kw, loginType}) => {
        const data = await ServiceWorkerModel.getMyCustomer({page, pagesize, id, kw, loginType});
        return data;
    },
    addCustomer: async(obj) => {
        const data = await ServiceWorkerModel.addCustomer(obj);
        return data;
    },
    getCustomerById: async(cid) => {
        const data = await ServiceWorkerModel.getCustomerById(cid);
        return data;
    },
    deleteCustomerById: async(cid) => {
        const data = await ServiceWorkerModel.deleteCustomerById(cid);
        return data;
    },
    getCustomerRelationShipeById: async (cid) => {
        const data = await ServiceWorkerModel.getCustomerRelationShipeById(cid);
        return data;
    },
    getCustomerByName: async (name) => {
        const data = await ServiceWorkerModel.getCustomerByName(name);
        return data;
    }
}

module.exports = ServiceWorkerService;