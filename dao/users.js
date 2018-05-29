/**
 * Created by Feil(admin@feil.wang) on 2018/5/29.
 */
let pool = require('../common/mysqlpool').pool;

module.exports = {
    queryUserById: function (params, callback) {
        let sql = `select * from user where userId = ?`;
        pool.query(sql, [params.userId], function (err, result) {
            if (err) {
                return callback('数据访问异常!');
            }
            callback(err, result)
        })
    },
    queryUserByPhone: function (params, callback) {
        let sql = `select * from user where phone = ?`;
        pool.query(sql, [params.phone], function (err, result) {
            if (err) {
                return callback('数据访问异常!');
            }
            callback(err, result)
        })
    }
};