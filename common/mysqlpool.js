/**
 * Created by Feil(admin@feil.wang) on 2018/5/12.
 */
let setting = require('../config/setting');
let mysql = require('mysql');
let pool = mysql.createPool(setting.db);

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();
        })
    })
}

exports.pool = pool;