const query = require('../service/mysql');

const TeacherModel = {
    getTeacherListPage: async ({pagesize, page, kw}) => {
        let _sql = `select t.tid as 'key', t.name, t.phone_number from Teacher t`;
        let inserts = [];
        if (kw && kw != 'undefined'){
            _sql += " where t.name like '%"+ kw + "%'";
        }
        const tmp = await query(_sql, inserts);
        const LEN = tmp.length;
        _sql+= ' order by t.tid desc limit ?,?';
        // console.log(_sql)
        inserts = [...inserts, page*pagesize, parseInt(pagesize)];;
        
        const list = await query(_sql, inserts);
        let pager = {
            page: page,
            pagesize: pagesize,
            rowcount: LEN,
            pagecount: Math.ceil(LEN / pagesize)
        }
        // console.log(list);
        return {list, pager};
    },
    // 添加教师
    addTeacher: async (teacher) => {
        // 向数据库中添加数据
        let _sql = '';
        let inserts = []
        console.log(teacher);
        if (teacher.tid){
            // 编辑学生
            _sql += `update Teacher set name = ? phone_number = ? where tid = ${teacher.tid}`
            for (const key in teacher) {
                if (teacher.hasOwnProperty(key) && key != 'tid') {
                    inserts.push(teacher[key]);
                }
            }
        } else {
            // 添加新学生之前检测该客户是否已经存在，主要判断手机号是否存在
            let checkSql = `select name from Teacher where phone_number = ?`;
            const  checkSqlResult = await query(checkSql, [teacher.phone_number]);
            if (checkSqlResult.length > 0) {
                return {error: true, code: 99, message: '用户已存在'};
            }
            // 添加新学生
            _sql = `insert into Teacher (name, phone_number) values
                    (?, ?)`;
            for (const key in teacher) {
                if (teacher.hasOwnProperty(key) && key != 'tid') {
                    inserts.push(teacher[key]);
                }
            }
        }
        return await query(_sql, inserts);
    },
    // 通过id获取老师的信息
    getTeacherById: async (tid) => {
        let _sql = `select t.tid as 'key', t.name, t.phone_number from Teacher t where tid = ${parseInt(tid)}`;
        return await query(_sql);
    },
    // 通过id删除老师
    deleteTeacherById: async (tid) => {
        let _sql = `delete from Teacher where tid = ${parseInt(tid)}`;
        return await query(_sql);
    }
}

module.exports = TeacherModel;