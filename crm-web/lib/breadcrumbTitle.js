
const Title = {
    mycustomer: '我的客户',
    change: '修改关系',
    add: '添加客户',
    add_: '编辑客户',
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
            title = Title.add_;
        }
        
        return title;
    }
}
export default Title;