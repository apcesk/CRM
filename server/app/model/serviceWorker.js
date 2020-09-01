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
    getMyCustomer: async ({page, pagesize, id, kw, loginType}) => {
        let _sql = `select c.cid as 'key', c.name, c.wechat, c.phone_number as phone, c.date_first_reg, c.remarks, c.address, c.last_review_date
                    from Customer c`;
        let inserts = [];
        
        if (id){
            inserts.push(parseInt(id));
            _sql += ' where c.service_id = ?';
            if (kw && kw != 'undefined'){
                _sql += " and c.name like '%"+ kw + "%'";
            }
        }
        if (loginType && loginType == 1) {
            _sql = `select c.cid as 'key', c.name, c.wechat, c.phone_number as phone, c.date_first_reg, c.remarks, c.address, c.last_review_date
            from Customer c`;
            inserts = [];
            if (kw && kw != 'undefined'){
                _sql += " where c.name like '%"+ kw + "%'";
            }
        }
        const tmp = await query(_sql, inserts);
        const LEN = tmp.length;
        _sql+= ' order by cid desc limit ?,?';
        inserts = [...inserts, page*pagesize, pagesize];;
        
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
        obj.wechat = obj.wechat === 'null' ? '无' : obj.wechat;
        let _sql = '';
        let inserts = []
        if (obj.cid){
            // 编辑客户
            _sql += `update Customer set name = ?, wechat = ?, phone_number = ?, date_first_reg = ?, address = ?, service_id = ?, remarks = ?, last_review_date = ? where cid = ${obj.cid}`
            for (const key in obj) {
                if (obj.hasOwnProperty(key) && key != 'cid') {
                    inserts.push(obj[key]);
                }
            }
            inserts.push(obj['date_first_reg']);
        } else {
            // 添加新客户之前检测该客户是否已经存在，主要判断手机号是否存在
            let checkSql = `select name from Customer where phone_number = ?`;
            const  checkSqlResult = await query(checkSql, [obj.phone_number]);
            if (checkSqlResult.length > 0) {
                return {error: true, code: 99, message: '用户已存在'};
            }
            // 添加新客户
            _sql = `insert into Customer (name, wechat, phone_number, date_first_reg, address, service_id, remarks, last_review_date) values
                    (?, ?, ?, ?, ?, ?, ?, ?)`;
            for (const key in obj) {
                if (obj.hasOwnProperty(key) && key != 'cid') {
                    inserts.push(obj[key]);
                }
            }
            // inserts.push(obj['date_first_reg']);
        }

        return await query(_sql, inserts);
        
    },
    // 通过id查询客户
    getCustomerById: async (cid) => {
        let _sql = `select name, wechat, phone_number, address, date_first_reg, remarks, last_review_date from Customer where cid = ?`;
        let inserts = [parseInt(cid)];
        return await query(_sql, inserts);
    },
    // 通过id删除用户
    deleteCustomerById: async (cid) => {
        let inserts = [cid];
        let _sql = `delete from Customer where cid = ?`;
        await query(_sql, inserts);
        return true;
    },
    // 通过cid获取用户的关系
    getCustomerRelationShipeById: async (cid) => {
        let inserts = [cid];
        let _sql = "select C.name as cname, C.cid , E.name as ename, E.eid from Customer C join Employee E on cid = ? and E.eid = C.service_id" ;
        return await query(_sql, inserts);
        // select name, service_id from Customer where cid = 5 left join Employee E where eid = serviceid
    },
    // 通过name获取客户的id和name
    getCustomerByName: async (id) => {
        let inserts = [parseInt(id)];
        let _sql = `select C.cid, C.name as cname, E.eid, E.name as ename from Customer C join Employee E on C.cid = ? and E.eid = C.service_id`;
        return await query(_sql, inserts);
    }
    
}

module.exports = ServiceWorkerModel;