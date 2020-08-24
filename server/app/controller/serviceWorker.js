const Kit = require("../libs/kit");
const R = require('../service/response');
const SWS = require('../service/serviceWorker');
const Tools = require('./tools');
const ServiceWorkerController = {
    // 客服登录
    login: async (ctx) => {
        // 获取用户名
        let name = ctx.request.body.email;
        // 获取密码
        let password = ctx.request.body.password;
        // 检查是否正确的输入了name 和 password
        if (!name) return R.error(2, 'name', ctx);
        if (!password) return R.error(2, 'password', ctx);
        // 进行数据库查询
        const result = await SWS.checklogin(name, password);
        // 检查查询结果
        if (result) {
            let token = Tools.setToken();
            // 保存token
            ctx.session.token = token;
            // 保存用户名
            ctx.session.name = name;
            // 保存用户id
            ctx.session.id = result.cid;
            // 保存用户类型, E代表员工， C代表客户
            ctx.session.login_type = 'E';
            R.success({
                token: token,
                login_type: 'E',
                info: {
                    id: result.cid,
                    name: result.name,
                }
            }, ctx);
        }
    }
}

module.exports = ServiceWorkerController;