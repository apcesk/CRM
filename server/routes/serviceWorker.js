// ServiceWorkerController
const SWC = require('../app/controller/serviceWorker');

const ServiceWorkerRouter = {
    // 路由前缀-> 命名空间
    name: '/service',
    routes: [
        {methods: 'post', path:'/login', realize: SWC.login}, // 客服人员的登录
        {methods: 'get', path:'/getMyCustomer', realize: SWC.getMyCustomer}, // 客服人员的登录
    ]
}

module.exports = ServiceWorkerRouter;