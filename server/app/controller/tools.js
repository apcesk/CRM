// 一个随机生成token的工具
const Tools = {
    setToken: (length) => {
        const tokenString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length;i > 0;i--) {
            result += tokenString[Math.floor(Math.random() * tokenString.length)];
        }
        return result;
    }
}
module.exports = Tools;