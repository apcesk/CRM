# 数据库文件
drop database if exists CRM;
create database CRM charset="utf8";
use CRM;

# 工作人员表
create table `Employee`(
    `eid` int auto_increment primary key, #id值
    `name` varchar (16) not null, #客服名称
    `password` varchar(16) not null, #密码
    `power` tinyint default 0, #是否拥有管理权限,1管理员,2教务,0销售
    `position` varchar(16), #职位名称
    `count_client` int default 0, #当前跟进的客户总数
    `other_1` varchar(255) default null, #留空备用
    `other_2` varchar(255) default null, #留空备用
    `other_3` varchar(255) default null #留空备用
);

# 客户表
create table `Customer`(
    `cid` int primary key not null auto_increment, # id值
    `name` varchar(16) not null, #客户姓名
    `wechat` varchar(20) not null, #微信号
    `phone_number` varchar(13) not null, #手机号
    `last_review_date` varchar(20) default null, #上次回访日期,null表示未回访
    `remarks` text default null, #备注
    `address` varchar(50) default null, #地址
    `state` int default 0, #跟进状态，用0，1，2表示，0表示未跟进，1跟进中，2跟进截止
    `service_id` int default 0, #当前客户属于哪个客服
    `date_first_reg` varchar(20) null, #首次添加用户的日期
    `other_1` varchar(255) default null, #留空备用
    `other_2` varchar(255) default null, #留空备用
    `other_3` varchar(255) default null, #留空备用
    foreign key(service_id) references Employee(eid)
);
insert into `Employee` (`eid`, `name`, `password`, `power`, `position`, `count_client`) 
values 
    (1, 'apcesk', '123456', 1, '测试', 0);
insert into `Employee` (`eid`, `name`, `password`, `power`, `position`, `count_client`) 
values 
    (null, 'zhang', '123456', 0, '测试', 0);
insert into `Customer` (`cid`, `name`, `wechat`, `phone_number`, `last_review_date`, `remarks`, `address`, `state`, `service_id`, `date_first_reg`)
values
    (null, '拉拉', '1234567', '13745674567', '2020', '这是备注', '中华街23号', 1, 2, '2020');
insert into `Customer` (`cid`, `name`, `wechat`, `phone_number`, `last_review_date`, `remarks`, `address`, `state`, `service_id`, `date_first_reg`)
values
    (null, '李四', '1234567', '13245674567', '2020-09-02', '这是备注', '中华街23号', 1, 1, '2020-09-02');
insert into `Customer` (`cid`, `name`, `wechat`, `phone_number`, `last_review_date`, `remarks`, `address`, `state`, `service_id`, `date_first_reg`)
values
    (null, '王五', '1234567', '13245674567', '2020-09-02', '这是备注', '中华街23号', 1, 1, '2020-09-02');
insert into `Customer` (`cid`, `name`, `wechat`, `phone_number`, `last_review_date`, `remarks`, `address`, `state`, `service_id`, `date_first_reg`)
values
    (null, '赵六', '1234567', '13245674567', '2020-09-02', '这是备注', '中华街23号', 1, 1, '2020-09-02');
insert into `Customer` (`cid`, `name`, `wechat`, `phone_number`, `last_review_date`, `remarks`, `address`, `state`, `service_id`, `date_first_reg`)
values
    (null, '张', '1234567', '13245674567', '2020-09-02', '这是备注', '中华街23号', 1, 2, '2020-09-02');
insert into `Customer` (`cid`, `name`, `wechat`, `phone_number`, `last_review_date`, `remarks`, `address`, `state`, `service_id`, `date_first_reg`)
values
    (null, '李', '1234567', '13245674567', '2020-09-02', '这是备注', '中华街23号', 1, 2, '2020-09-02');
insert into `Customer` (`cid`, `name`, `wechat`, `phone_number`, `last_review_date`, `remarks`, `address`, `state`, `service_id`, `date_first_reg`)
values
    (null, '王', '1234567', '13245674567', '2020-09-02', '这是备注', '中华街23号', 1, 2, '2020-09-02');
insert into `Customer` (`cid`, `name`, `wechat`, `phone_number`, `last_review_date`, `remarks`, `address`, `state`, `service_id`, `date_first_reg`)
values
    (null, '赵', '1234567', '13245674567', '2020-09-02', '这是备注', '中华街23号', 1, 2, '2020-09-02');


# 教师表
create table `Teacher`(
    `tid` int primary key not null auto_increment, # id值
    `name` varchar(16) not null, #教师姓名
    `phone_number` varchar(13) not null, #手机号
    `other_1` varchar(255) default null, #留空备用
    `other_2` varchar(255) default null, #留空备用
    `other_3` varchar(255) default null #留空备用
);
INSERT INTO Teacher (`tid`, `name`, `phone_number`)
VALUES (1, 'teacher1', '1234567890');
INSERT INTO Teacher (`tid`, `name`, `phone_number`)
VALUES (2, 'teacher2', '1234567891');
INSERT INTO Teacher (`tid`, `name`, `phone_number`)
VALUES (3, 'teacher3', '1234567892');
# 学生表
create table `Student`(
    `sid` int primary key not null auto_increment, # id值
    `name` varchar(16) not null, #客户姓名
    `wechat` varchar(20) not null, #微信号
    `phone_number` varchar(13) not null, #手机号
    `last_review_date` varchar(20) default null, #上次回访日期,null表示未回访
    `remarks` text default null, #备注
    `address` varchar(50) default null, #地址
    `state` int default 0, #跟进状态，用0，1，2表示，0表示未跟进，1跟进中，2跟进截止
    `service_id` int default 0, #当前客户属于哪个客服
    `date_first_reg` varchar(20) null, #首次添加用户的日期
    `other_1` varchar(255) default null, #留空备用
    `other_2` varchar(255) default null, #留空备用
    `other_3` varchar(255) default null, #留空备用
    foreign key(service_id) references Teacher(tid)
);
INSERT INTO Student (`sid`, `name`, `wechat`, `phone_number`, `last_review_date`, `remarks`, `address`, `state`, `service_id`, `date_first_reg`)
VALUES
    (1, '学生1', '学生1的微信', '12345678', '2020-09-01', '备注', '地址', 0, 1, '2020-09-01');
INSERT INTO Student (`sid`, `name`, `wechat`, `phone_number`, `last_review_date`, `remarks`, `address`, `state`, `service_id`, `date_first_reg`)
VALUES
    (null, '学生2', '学生1的微信', '12345678', '2020-09-01', '备注', '地址', 0, 1, '2020-09-01');
INSERT INTO Student (`sid`, `name`, `wechat`, `phone_number`, `last_review_date`, `remarks`, `address`, `state`, `service_id`, `date_first_reg`)
VALUES
    (null, '学生3', '学生1的微信', '12345678', '2020-09-01', '备注', '地址', 0, 1, '2020-09-01');
INSERT INTO Student (`sid`, `name`, `wechat`, `phone_number`, `last_review_date`, `remarks`, `address`, `state`, `service_id`, `date_first_reg`)
VALUES
    (null, '学生4', '学生1的微信', '12345678', '2020-09-01', '备注', '地址', 0, 2, '2020-09-01');