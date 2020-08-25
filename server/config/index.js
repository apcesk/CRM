// 配置相关属性
// 是否是开发环境
const DEV = true;
// 配置服务器的访问地址
const serverUrl = '...';
/**
 * @attribute port 服务器 端口号
 * @mysql mysql相关配置
 * @prefix 请求接口地址
 * @originUrl 允许跨域的访问路径
 */
const config = {
    port: '8080',
    mysql: {
        database: 'CRM',
        user: 'root',
        password: DEV ? 'MH0703zyc1225' : '',
        port: '3306',
        host: '',
    },
    prefix: '/api',
    originUrl: DEV ? 'http://127.0.0.1:3000' : serverUrl
};

module.exports = config;