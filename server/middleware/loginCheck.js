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
        // console.log("ctx.session.token: ", ctx.session); // 本地测试有值，服务器端使用的时候变成undefined，
        if (!ctx.session.token || !ctx.header.token || (ctx.session.token !== ctx.header.token)) {
            R.error(10, ctx.header.token, ctx);
        } else {
            await next()
        }
    }
}
module.exports = loginCheck;