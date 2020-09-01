const Kit = require("../libs/kit");
const R = require('../service/response');
const STU = require('../service/student');
const Tools = require('./tools');
const StudentController = {
    getStudentList: async (ctx) => {
        const { page, pagesize, kw } = ctx.query;
        // console.log(ctx.query);
        const result = await STU.getMyCustomer({page, pagesize, kw});
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '发生了错误',ctx)
        }
    },
    getStudentsByTeacherName: async (ctx) => {
        const { page, pagesize, teacherName } = ctx.query;
        console.log(ctx.query);
        const result = await STU.getStudentsByTeacherName({ page, pagesize, teacherName });
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '查无此人', ctx);
        }
    },
    deleteStudentById: async (ctx) => {
        const {sid} = ctx.request.body;
        const result = await STU.deleteStudentById(sid);
        if (result.length > 0) {
            R.success(result, ctx);
        } else {
            R.error(99, '出错了，请刷新', ctx);
        }
    },
    addStudent: async (ctx) => {
        let {name, wechat, phone_number, last_review_date, address, teacher, remarks, sid, date_first_reg} = ctx.request.body;
        let obj = {
            name:name, 
            wechat:wechat, 
            phone_number:phone_number, 
            last_review_date:last_review_date, 
            address:address, 
            service_id:teacher, 
            remarks:remarks,
            sid: sid,
            date_first_reg: date_first_reg
        };
        let result = await STU.addStudent(obj);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '添加失败啦！',ctx);
        }
    },
    getStudentById: async (ctx) => {
        const sid = ctx.query.sid;
        let result = await STU.getStudentById(sid);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '查无此人?', ctx);
        }
    },
    getTeacherList: async (ctx) => {
        const result = await STU.getTeacherList();
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '未知错误，请刷新重试', ctx);
        }
    }
}

module.exports = StudentController;