const Config = require('./config');
const Koa = require('koa');
const Routes = require('./routes');
const MiddleWare = require('./middleware/index');
const app = new Koa();

app.on('error', (err, ctx) => {
    console.log('server error', err);
});

// 激活所有中间件
MiddleWare(app);

app.use(Routes.routes()).use(Routes.allowedMethods());

// 启动服务
app.listen(Config.port, () => {
    console.log('启动成功' + Config.port);
    console.log(`当前允许跨域的是 ${Config.originUrl}`)
})
// xxx