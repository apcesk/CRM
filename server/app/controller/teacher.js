const Kit = require("../libs/kit");
const R = require('../service/response');
const TM = require('../service/teacher');
const Tools = require('./tools');

const TeacherController = {
    getTeacherListPage: async (ctx) => {
        const {page, pagesize, kw} = ctx.query;
        const obj = {
            page: page,
            pagesize: pagesize,
            kw: kw
        }
        const result = await TM.getTeacherListPage(obj);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '出错了，请重试', ctx);
        }
    },
    addTeacher: async (ctx) => {
        const {name, tid, phone_number} = ctx.request.body;
        console.log(ctx.request.body);
        const result = await TM.addTeacher({name, tid, phone_number});
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '添加失败，请刷新重试', ctx);
        }
    },
    getTeacherById: async (ctx) => {
        const { tid } = ctx.query;
        console.log(tid);
        const result = await TM.getTeacherById(tid);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '失败了，请重试！', ctx);
        }
    },
    deleteTeacherById: async (ctx) => {
        const { tid } = ctx.request.body;
        console.log(ctx.request.body);
        const result = await TM.deleteTeacherById(tid);
        console.log(result);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, '出错了，请重试', ctx);
        }
    }
}

module.exports = TeacherController;