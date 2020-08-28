// ServiceWorkerController
const EMP = require('../app/controller/employee');

const Employee = {
    // 路由前缀-> 命名空间
    name: '/employee',
    routes: [
        {methods: 'get', path:'/getEmployeeList', realize: EMP.getEmployeeList}, // 获取工作人员列表
        {methods: 'post', path:'/changeRelationship', realize: EMP.changeRelationship}, // 改变客户关系
        {methods: 'post', path:'/addEmployee', realize: EMP.addEmployee}, // 添加客服
        {methods: 'get', path:'/getEmployeeById', realize: EMP.getEmployeeById}, // 客服人员的登录
        {methods: 'post', path:'/deleteEmployeeById', realize: EMP.deleteEmployeeById}, // 客服人员的登录
    ]
}

module.exports = Employee;