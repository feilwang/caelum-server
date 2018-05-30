/**
 * Created by Feil(admin@feil.wang) on 2018/5/29.
 */
let async = require('async');
let util = require('../common/util');
let usersDAO = require('../dao/users');
let signDAO = require('../dao/sign');

function register(params, callback) {
    async.waterfall([
        function (next) {
            //通过手机号查询用户信息
            usersDAO.queryUserByPhone(params, function (err, result) {
                if (err) {
                    next(err);
                } else {
                    next(null, result);
                }
            });
        },
        //注册
        function (result, next) {
            if (result.length > 0) {
                next('该手机号已注册！');
            } else {
                //注册
                params.password = util.createPassword(params.password);
                params.nickName = `caelum_${Math.floor(Math.random() * 1000000)}`;
                signDAO.register(params, function (err, result) {
                    if (err) {
                        next(err)
                    } else {
                        next(null, result)
                    }
                });
            }
        },
        //再次查询信息并返回
        function (result, next) {
            usersDAO.queryUserByPhone(params, function (err, result) {
                if (err) {
                    next(err);
                } else {
                    delete result[0].password;
                    next(null, result[0]);
                }
            });
        }
    ], function (err, result) {
        console.log('register result:', err, result);
        callback(err, result)
    });
}

function login(params, callback) {
    params.password = util.createPassword(params.password);
    signDAO.login(params, function (err, result) {
        if (err) {
            callback(err)
        } else {
            if (result.length > 0) {
                delete result[0].password;
                callback(null, result[0])
            } else {
                callback('用户名或密码错误!');
            }
        }

    });
}

module.exports = {
    register,
    login
};
