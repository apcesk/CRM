const Kit = require("../libs/kit");
const R = require('../service/response');
const EMP = require('../service/employee');
const Tools = require('./tools');
const EmployeeController = {
    getEmployeeList: async (ctx) => {
        let obj;
        if (ctx) {
            const pager = Kit.getPage(ctx);
            // 保存关键字
            const kw = ctx.query.kw || '';
            const id = ctx.query.id;
            const loginType = ctx.query.loginType;
            obj = {
                page: pager.page,
                pagesize: pager.pagesize,
                id: id,
                kw: kw,
                loginType: loginType
            }
        }
        let result = await EMP.getEmployeeList(obj);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '错误', ctx);
        }
    },
    changeRelationship: async (ctx) => {
        const {cid, eid} = ctx.request.body;
        let result = await EMP.changeRelationship({cid, eid});
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '修改失败', ctx)
        }
    },
    addEmployee: async (ctx) => {
        const {ename, password, power} = ctx.request.body;
        let obj = {
            name: ename,
            password: password,
            power: power
        };
        // 查重复
        let exists = await EMP.existsEmployee(ename);
        if (exists.length === 0) {
            let result = await EMP.addEmployee(obj);
            if (result) {
                R.success(result, ctx);
            } else {
                R.error(99, '添加失败', ctx);
            }
        } else {
            R.error(99, '用户名已存在，请修改!', ctx);
        }
        
    },
    getEmployeeById: async (ctx) => {
        const {eid} = ctx.query;
        let result = await EMP.getEmployeeById(eid);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '查无此人', ctx);
        }
    },
    deleteEmployeeById: async (ctx) => {
        const id = ctx.request.body.id;
        const result = EMP.deleteEmployeeById(id);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '删除失败', ctx);
        }
    },
    getCustomersByEmployeeName: async (ctx) => {
        // 获取分页查询的数据
        const pager = Kit.getPage(ctx);
        // 保存name值
        const name = ctx.query.employeeName;
        let obj = {
            page: pager.page,
            pagesize: pager.pagesize,
            name: name
        }
        let result = await EMP.getCustomersByEmployeeName(obj);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '系统错误', ctx);
        }
    },
}

module.exports = EmployeeController;