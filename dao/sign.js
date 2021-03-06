/**
 * Created by Feil(admin@feil.wang) on 2018/5/12.
 */
let pool = require('../common/mysqlpool').pool;

module.exports = {
    register: function (params, callback) {
        let sql = `insert into user (phone,password,nickName) values(?,?,?)`;
        pool.query(sql, [params.phone, params.password, params.nickName], function (err, result) {
            if (err) {
                return callback('数据访问异常!');
            }
            callback(err, result)
        })
    },
    login: function (params, callback) {
        let sql = `select * from user where phone = ? and password = ?`;
        pool.query(sql, [params.phone, params.password], function (err, result) {
            if (err) {
                return callback('数据访问异常!');
            }
            callback(err, result)
        })
    }
};