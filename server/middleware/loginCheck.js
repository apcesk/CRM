const R = require('../app/service/response');
const Config = require('../config');

const whiteList = [
    Config.prefix + '/service/login'
];

// 登录检查
const loginCheck = async (ctx, next) => {
    // console.log('ctx.url: ', ctx.url);
    if (whiteList.includes(ctx.url)) {
        // console.log('ctx.url: ', ctx.url);
        await next();
    } else {
        // 判断是否已经登录
        // console.log('判断是否已经登录')
        if (!ctx.session.token || !ctx.header.token || (ctx.session.token !== ctx.header.token)) {
            R.error(10, ctx.header.token, ctx);
        } else {
            await next()
        }
    }
}
module.exports = loginCheck;