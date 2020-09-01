const TM = require('../model/teacher');

const TeacherService = {
    getTeacherListPage: async (obj) => {
        const data = await TM.getTeacherListPage(obj);
        return data;
    },
    addTeacher: async (teacher) => {
        const data = await TM.addTeacher(teacher);
        return data;
    },
    getTeacherById: async (tid) => {
        const data = await TM.getTeacherById(tid);
        return data;
    },
    deleteTeacherById: async (tid) => {
        const data = await TM.deleteTeacherById(tid);
        return data;
    }
}

module.exports = TeacherService;