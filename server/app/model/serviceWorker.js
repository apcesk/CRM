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
    // 获取和查询
    getMyCustomer: async ({page, pagesize, id, kw}) => {
        let _sql = `select c.cid as 'key', c.name, c.wechat, c.phone_number as phone, c.date_first_reg, c.remarks, c.address
                    from Customer c`;
        let inserts = [];
        if (id){
            inserts.push(parseInt(id));
            _sql += ' where c.service_id = ?';
        }
        if (kw && kw != 'undefined'){
            _sql += " and c.name like '%"+ kw + "%'";
        }
        const tmp = await query(_sql, inserts);
        const LEN = tmp.length;
        // console.log("LEN: ", LEN);
        _sql+= ' limit ?,?';
        inserts = [...inserts, page*pagesize, pagesize];;
        
        // console.log('inserts: \n', inserts);
        const list = await query(_sql, inserts);
        let pager = {
            page: page,
            pagesize: pagesize,
            rowcount: LEN,
            pagecount: Math.ceil(LEN / pagesize)
        }
        return {list, pager};
    },
    // 添加或修改客户
    addCustomer: async (obj) => {
        // 向数据库中添加数据
        // let {name, wechat, phone_number, date_first_reg, address, service_id, remarks} = obj;
        console.log("model -> ", obj)
        obj.wechat = obj.wechat === 'null' ? '无' : obj.wechat;
        let _sql = '';
        let inserts = []
        if (obj.cid){
            console.log('编辑了一个老客户')
            // 编辑客户
            _sql += 'update'
        } else {
            // 添加新客户
            console.log('添加了一个新客户');
            _sql = `insert into Customer (name, wechat, phone_number, date_first_reg, address, service_id, remarks, date_first_reg) values
                    (?, ?, ?, ?, ?, ?, ?, ?)`;
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    inserts.push(obj[key]);
                }
            }
            inserts.push(obj['date_first_reg']);
        }

        return await query(_sql, inserts);
        
    },
    // 通过id查询客户
    getCustomerById: async (cid) => {
        let _sql = `select name, wechat, phone_number, address, date_first_reg, remarks from Customer where cid = ?`;
        let inserts = [parseInt(cid)];
        return await query(_sql, inserts);
    }
    
}

module.exports = ServiceWorkerModel;