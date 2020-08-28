const query = require('../service/mysql');

const EmployeeModel = {
    // 获取所有客服name
    getEmployeeList: async ({page, pagesize, id, kw, loginType}) => {
        let _sql = `select name as ename, eid from Employee`;
        let inserts = [];
        if (page !== 'undefined' && pagesize !== 'undefined') {
            _sql = `select name, eid as 'key' from Employee`;
            
            const tmp = await query(_sql, inserts);
            const LEN = tmp.length;
            // console.log("LEN: ", LEN);
            _sql+= ' limit ?,?';
            inserts = [...inserts, page * pagesize, pagesize];
            // console.log('inserts: \n', inserts);
            const list = await query(_sql, inserts);
            let pager = {
                page: page,
                pagesize: pagesize,
                rowcount: LEN,
                pagecount: Math.ceil(LEN / pagesize)
            }
            return {list, pager};
        }
        return await query(_sql, inserts);
    },
    // 修改客户关系
    changeRelationship: async({cid, eid}) => {
        // console.log(`cid: ${cid}, eid: ${eid}`);
        let inserts = [eid, cid];
        let _sql = `update Customer set service_id = ? where cid = ?`;
        return await query(_sql, inserts);
    },
    // 添加或修改职员
    addEmployee: async (obj) => {
        // 向数据库中添加数据
        let _sql = '';
        let inserts = [];
        if (obj.eid){
            // 编辑职员
            _sql += `update Employee set name = ?, password = ?, power = ? where eid = ${obj.eid}`
            for (const key in obj) {
                if (obj.hasOwnProperty(key) && key != 'eid') {
                    inserts.push(obj[key]);
                }
            }
        } else {
            // 添加新客户
            _sql = `insert into Employee (name, password, power) values
                    (?, ?, ?)`;
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    inserts.push(obj[key]);
                }
            }
        }

        return await query(_sql, inserts);
        
    },
    // 通过id获取员工信息
    getEmployeeById: async (eid) => {
        let inserts = [eid];
        let _sql = `select name as ename, password, power from Employee where eid = ?`;
        return await query(_sql, inserts);
    },
    // 查询是否重复
    existsEmployee: async (ename) => {
        let inserts = [ename];
        let _sql = `select * from Employee where name = ?`;
        return query(_sql, inserts);
    },
    // 根据id删除职员
    deleteEmployeeById: async (id) => {
        let _sql = `delete from Employee where eid = ?`;
        let inserts = [id];
        return await query(_sql, inserts);
    }
}

module.exports = EmployeeModel;