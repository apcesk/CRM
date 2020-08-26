// 数据库服务
const mysql = require('mysql');
const Config = require('../../config');

// 数据库配置
const con = Config.mysql;

// 创建数据库连接池
const pool = mysql.createPool(con);

// 使用连接池
const query = (_sql, sqlParams, params) => {
    _sql = _sql.replace(/\t/gi, ' ');
    _sql = _sql.replace(/\n/gi, ' ');
    _sql = _sql.replace(/\s\s/gi, ' ');
    sql = mysql.format(_sql, sqlParams);
    return new Promise((resolve, reject) => {
        // 使用数据库进行查询，将查询的结果返回出去
        pool.query(sql, params, (err, result) => {
            // console.log("mysql->query: ", result)
            if (err) reject(err)
            resolve(result);
        })
    })
}

module.exports = query;