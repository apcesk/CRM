
const Title = {
    mycustomer: '我的客户',
    change: '修改关系',
    add: '添加客户',
    add_: '编辑客户',
    employee: '添加员工',
    'employee?id': '编辑员工',
    getTitle: function(key) {
        console.log(key);
        let title;
        Object.keys(Title).forEach(e => {
            // console.log(e);
            if (e === key) {
                title = Title[e];
            }
        });
        if (!title) {
            title = key && key.includes('add') ? '编辑客户' : '编辑员工';
        }
        
        return title;
    }
}
export default Title;