const TC = require('../app/controller/teacher.js');

const Teacher = {
    // 路由前缀-> 命名空间
    name: '/teacher',
    routes: [
        {methods: 'get', path:'/getTeacherListPage', realize: TC.getTeacherListPage}, // 获取教师列表
        {methods: 'get', path:'/getTeacherById', realize: TC.getTeacherById}, // 通过id获取老师的信息
        {methods: 'post', path:'/addTeacher', realize: TC.addTeacher}, // 添加教师
        {methods: 'post', path:'/deleteTeacherById', realize: TC.deleteTeacherById}, // 通过id删除老师
        
        
    ]
}
module.exports = Teacher;