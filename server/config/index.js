// 配置相关属性
// 是否是开发环境
const DEV = false;
// 配置服务器的访问地址，主要是在没有域名的情况下使用
const serverUrl = '39.104.84.48';
// 配置上线域名,如果有域名的话使用这个
const domain = 'test.apcesk.com';
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
        password: DEV ? 'MH0703zyc1225' : 'MH0703zyc1225',
        port: '3306',
        host: '',
    },
    prefix: '/api',
    // 没有域名用这个
    // originUrl: DEV ? 'http://localhost:3000' : serverUrl
    // 有域名用这个
    originUrl: DEV ? 'http://localhost:3000' : domain
};

module.exports = config;