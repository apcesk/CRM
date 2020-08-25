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
        let _sql = `select * from Employee where name = ? and password = ?`;
        // 获取查询结果
        return await query(_sql, inserts);
    },
    
    getMyCustomer: async (page, pagesize, id) => {
        let _sql = `select c.cid as 'key', c.name, c.wechat, c.phone_number as phone, c.last_review_date, c.remarks, c.address
                    from Customer c`;
        let inserts = []
        if (id){
            inserts.push(parseInt(id));
            _sql += ' where c.service_id = ?';
        }
        _sql+= ' limit ?,?';
        inserts = [...inserts, page, pagesize];
        
        console.log('inserts: \n', inserts);
                    
        return await query(_sql, inserts);
    }
    
}

module.exports = ServiceWorkerModel;