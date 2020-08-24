// 对错误或者成功的请求进行响应

const ResponseService = {
    // 成功请求
    success: function (data, ctx) {
        if (data.hasOwnProperty('list') && data.hasOwnProperty('pager')) {
            ctx.response.body = {
                code: 0,
                datas: data.list,
                pager: data.pager,
                message: ''
            }
        } else {
            ctx.response.body = {
                code: 0,
                datas: data,
                message: ''
            }
        }
    },
    // 失败
    error: function (errType, errMsg, ctx) {
        let message = '';
        switch (errType) {
            case 1:
                message = '用户名或密码错误' + errMsg;
                break;
            case 2:
                message = '缺少参数' + errMsg;
                break;
            case 10:
                message = '登录失效' + errMsg;
                break;
            default:
                message = '未知错误';
                break;
        }
        ctx.response.body = {
            code: errType,
            error: true,
            test: 'test',
            message
        }
    }
}
module.exports = ResponseService;