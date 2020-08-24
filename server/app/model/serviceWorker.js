// 客服模型

const query = require('../service/mysql');


// 客服模型
const ServiceWorkerModel = {
    /**
     * @param {name: string, password: string} 
     * @return {object: Promise}
     */
    checkLogin: async (name, password) => {
        // 获取name 和password
        let inserts = [name, password];
        // sql 语句
        let _sql = `select * from Customer where name = ? and password = ?`;
        // 获取查询结果
        return await query(_sql, inserts);
    },
    
}

module.exports = ServiceWorkerModel;