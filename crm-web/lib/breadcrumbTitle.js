
const Title = {
    'mycustomer': '我的客户',
    'change': '修改关系',
    'addCustomer': '添加客户',
    'addCustomer?id': '编辑客户',
    'employee': '添加员工',
    'employee?id': '编辑员工',
    'empList': '员工列表',
    'studentList': '学生列表',
    'editStudent': '添加学生',
    'editStudent?id': '修改学生',
    'teacherList': '教师列表',
    'addTeacher': '添加教师',
    'addTeacher?id': '编辑教师',
    getTitle: function(key) {
        let title;
        Object.keys(Title).forEach(e => {
            if (e === key) {
                title = Title[e];
            }
        });
        console.log(key);
        if (!title) {
            if (key && key.includes('?') ) {
                title = key.includes('Teacher') ? Title['addTeacher?id'] : '';
                if (title) return title;
                title = key.includes('Customer') ? Title['addCustomer?id'] : '';
                if (title) return title;
                title = key.includes('Student') ? Title['editStudent?id'] : '';
                if (title) return title;
                title = key.includes('employee') ? Title['employee?id'] : '';
                if (title) return title;
            }
        }
        
        return title;
    }
}
export default Title;