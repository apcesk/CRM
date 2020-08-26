const Kit = require("../libs/kit");
const R = require('../service/response');
const SWS = require('../service/serviceWorker');
const Tools = require('./tools');
const ServiceWorkerController = {
    // 客服登录
    login: async (ctx) => {
        // 获取用户名
        let name = ctx.request.body.username;
        // 获取密码
        let password = ctx.request.body.password;
        // console.log('name: ', name, '\npassword: ', password)
        // 检查是否正确的输入了name 和 password
        if (!name) return R.error(2, 'name', ctx);
        if (!password) return R.error(2, 'password', ctx);
        // 进行数据库查询
        const result = await SWS.checklogin(name, password);
        // console.log('result: ', result);
        // 检查查询结果
        if (result) {
            let token = Tools.setToken(8);
            // 保存token
            ctx.session.token = token;
            // 保存用户名
            ctx.session.name = name;
            // 保存用户id
            ctx.session.id = result.cid;
            // 保存用户权利
            ctx.session.login_type = result.power;
            R.success({
                token: token,
                login_type: result.power,
                info: {
                    id: result.eid,
                    name: result.name,
                },
                code: 0,
            }, ctx);
        }
    },
    getMyCustomer: async (ctx) => {
        // console.log("controller: \n",ctx)
        // 获取分页查询的数据
        const pager = Kit.getPage(ctx);

        // 保存关键字
        const kw = ctx.query.kw || '';
        const id = ctx.query.id;
        let obj = {
            page: pager.page,
            pagesize: pager.pagesize,
            id: id,
            kw: kw
        }
        let result = await SWS.getMyCustomer(obj);
        // console.log(result);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '系统错误', ctx);
        }
    },
    // 添加新的客户
    addCustomer: async (ctx) => {
        let {name, wechat, phone_number, last_review_date, address, service_id, remarks} = ctx.request.body;
        // console.log(ctx.request.body);
        let obj = {
            name:name, 
            wechat:wechat, 
            phone_number:phone_number, 
            last_review_date:last_review_date, 
            address:address, 
            service_id:service_id, 
            remarks:remarks
        };
        // console.log("controller: -> ", obj)
        let result = await SWS.addCustomer(obj);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '添加失败啦！',ctx);
        }
        
    },
    // 通过id获取用户信息
    getCustomerById: async (ctx) => {
        const cid = ctx.query.cid;
        let result = await SWS.getCustomerById(cid);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '查无此人?', ctx);
        }
    }
}

module.exports = ServiceWorkerController;