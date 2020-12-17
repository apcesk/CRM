const query = require('../service/mysql');

const StudentModel = {
    // 获取所有的学生
    getMyCustomer: async ({page, pagesize, kw}) => {
        let _sql = `select s.sid as 'key', s.name, s.wechat, s.phone_number as phone, s.date_first_reg, s.remarks, s.address, s.last_review_date, t.name as teacher
                    from Student s left join Teacher t on s.service_id = t.tid`;
        let inserts = [];
        if (kw && kw != 'undefined'){
            _sql += " where s.name like '%"+ kw + "%'";
        }
        
        const tmp = await query(_sql, inserts);
        const LEN = tmp.length;
        _sql+= ' order by s.service_id desc limit ?,?';
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
    // 通过教师的name获取所属学生
    getStudentsByTeacherName: async ({page, pagesize, teacherName}) => {
        let _sql = `select t.tid from Teacher t where t.name = ?`;
        let inserts = [teacherName];
        let tid = await query(_sql, inserts);
        // 存在老师
        if (tid[0] && tid[0]['tid']) {
            tid = tid[0]['tid'];
            inserts = [tid];
            _sql = `select s.sid from Student s where s.service_id = ?`;
            const tmp = await query(_sql, inserts);
            const LEN = tmp.length;
            _sql = `select s.sid as 'key', s.name, s.wechat, s.phone_number as phone, s.date_first_reg, s.remarks, s.address, s.last_review_date, t.name as teacher
            from Student s left join Teacher t on s.service_id = ?`;
            const list = await query(_sql, inserts);
            let pager = {
                page: page,
                pagesize: pagesize,
                rowcount: LEN,
                pagecount: Math.ceil(LEN / pagesize)
            }
            console.log(list);
            return {list, pager};
        } else {
            // 不存在相应的老师
            return {error: true, message:'查无此人'}
        }
    },
    // 通过id删除学生
    deleteStudentById: async (sid) => {
        let _sql = 'delete from Student where sid = ?';
        let inserts = [sid];
        const result = await query(_sql, inserts);
        return result;
    },
    // 添加学生
    addStudent: async(student) => {
        // 向数据库中添加数据
        student.wechat = student.wechat === 'null' ? '无' : student.wechat;
        let _sql = '';
        let inserts = []
        console.log(student);
        if (student.sid){
            // 编辑学生
            _sql += `update Student set name = ?, wechat = ?, phone_number = ?, last_review_date = ?, address = ?, remarks = ?, date_first_reg = ? where sid = ${student.sid}`
            for (const key in student) {
                if (student.hasOwnProperty(key) && key != 'sid' && key != 'service_id') {
                    inserts.push(student[key]);
                }
            }
            inserts.push(student['date_first_reg']);
        } else {
            // 添加新学生之前检测该客户是否已经存在，主要判断手机号是否存在
            let checkSql = `select name from Student where phone_number = ?`;
            const  checkSqlResult = await query(checkSql, [student.phone_number]);
            if (checkSqlResult.length > 0) {
                return {error: true, code: 99, message: '用户已存在'};
            }
            // 添加新学生
            _sql = `insert into Student (name, wechat, phone_number, last_review_date, address, service_id, remarks, date_first_reg) values
                    (?, ?, ?, ?, ?, ?, ?, ?)`;
            for (const key in student) {
                if (student.hasOwnProperty(key) && key != 'sid') {
                    inserts.push(student[key]);
                }
            }
        }
        return await query(_sql, inserts);
    },
    // 通过sid获取学生信息
    getStudentById: async (sid) => {
        let _sql = `select s.name, s.wechat, s.phone_number, s.address, s.date_first_reg, s.remarks, s.last_review_date, t.name as teacher
            from Student s left join Teacher t on t.tid = s.service_id where sid = ?`;
        let inserts = [parseInt(sid)];
        return await query(_sql, inserts);
    },
    // 获取教师列表
    getTeacherList: async () => {
        let _sql = `select t.name, t.tid as 'key' from Teacher t`;
        const result = await query(_sql);
        return result;
    }
}

module.exports = StudentModel;