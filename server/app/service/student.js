const STUMODEL = require('../model/student');


const StudentService = {
    getMyCustomer: async (obj) => {
        const data = await STUMODEL.getMyCustomer(obj);
        return data;
    },
    getStudentsByTeacherName: async (obj) => {
        const data = await STUMODEL.getStudentsByTeacherName(obj);
        return data;
    },
    deleteStudentById: async (sid) => {
        const data = await STUMODEL.deleteStudentById(sid);
        return data;
    },
    addStudent: async (student) => {
        const data = await STUMODEL.addStudent(student);
        return data;
    },
    getStudentById: async (sid) => {
        const data = await STUMODEL.getStudentById(sid);
        return data;
    },
    getTeacherList: async () => {
        const data = await STUMODEL.getTeacherList();
        return data;
    }

}

module.exports = StudentService;