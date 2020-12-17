// 路由组件
const Router = require('koa-router');
const Config = require('../config');
const ServiceRouter = require('./serviceWorker');
const EmployeeRouter = require('./employee');
const StudentRouter = require('./student');
const TeacherRouter = require('./teacher');
const Routes = new Router({
    prefix: Config.prefix
});

// 客服人员路由挂载
ServiceRouter.routes.forEach(e => {
    Routes[e.methods](ServiceRouter.name + e.path, e.realize);
});
// 工作人员路由挂载
EmployeeRouter.routes.forEach(e => {
    Routes[e.methods](EmployeeRouter.name + e.path, e.realize);
});
StudentRouter.routes.forEach(e => {
    Routes[e.methods](StudentRouter.name + e.path, e.realize);
});
TeacherRouter.routes.forEach(e => {
    Routes[e.methods](TeacherRouter.name + e.path, e.realize);
});

// Routes.get('/test', async (ctx, res) => {

//     console.log(ctx.query)
//     ctx.response.body = await '<h1>test</h1>';
    
// })

module.exports = Routes;