// ServiceWorkerController
const STU = require('../app/controller/student');

const Student = {
    // 路由前缀-> 命名空间
    name: '/student',
    routes: [
        {methods: 'get', path:'/getStudentList', realize: STU.getStudentList}, // 获取学生列表
        {methods: 'get', path:'/getStudentsByTeacherName', realize: STU.getStudentsByTeacherName}, // 通过教师名称获取学生列表
        {methods: 'get', path:'/getStudentById', realize: STU.getStudentById}, // 通过sid获取学生信息
        {methods: 'get', path:'/getTeacherList', realize: STU.getTeacherList}, // 获取所有的老师
        {methods: 'post', path:'/deleteStudentById', realize: STU.deleteStudentById}, // 通过教师名称获取学生列表
        {methods: 'post', path:'/addStudent', realize: STU.addStudent}, // 通过教师名称获取学生列表
        
    ]
}

module.exports = Student;