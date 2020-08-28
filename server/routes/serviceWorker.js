// ServiceWorkerController
const SWC = require('../app/controller/serviceWorker');

const ServiceWorkerRouter = {
    // 路由前缀-> 命名空间
    name: '/service',
    routes: [
        {methods: 'post', path:'/login', realize: SWC.login}, // 客服人员的登录
        {methods: 'get', path:'/getMyCustomer', realize: SWC.getMyCustomer}, // 获取我的客服
        {methods: 'post', path:'/addCustomer', realize: SWC.addCustomer}, // 添加或修改客户
        {methods: 'get', path:'/getCustomerById', realize: SWC.getCustomerById}, // 根据id获取客户
        {methods: 'post', path:'/deleteCustomerById', realize: SWC.deleteCustomerById}, // 根据id删除客户
        {methods: 'get', path:'/getCustomerRelationShipeById', realize: SWC.getCustomerRelationShipeById}, // 根据id删除客户
        {methods: 'get', path:'/getCustomerByName', realize: SWC.getCustomerByName}, // 根据id删除客户
    ]
}

module.exports = ServiceWorkerRouter;