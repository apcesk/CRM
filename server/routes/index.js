// 路由组件
const Router = require('koa-router');
const Config = require('../config');
const ServiceRouter = require('./serviceWorker');

const Routes = new Router({
    prefix: Config.prefix
});

// 客服人员路由挂载
ServiceRouter.routes.forEach(e => {
    Routes[e.methods](ServiceRouter.name + e.path, e.realize);
});

// Routes.get('/test', async (ctx, res) => {

//     console.log(ctx.query)
//     ctx.response.body = await '<h1>test</h1>';
    
// })

module.exports = Routes;