const Config = require('./config');
const Koa = require('koa');
const Routes = require('./routes');

const app = new Koa();

app.on('error', (err, ctx) => {
    console.log('server error', err);
});

app.use(Routes.routes()).use(Routes.allowedMethods());

// 启动服务
app.listen(Config.port, () => {
    console.log('启动成功' + Config.port);
})
