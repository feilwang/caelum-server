/**
 * Created by Feil(admin@feil.wang) on 2018/5/29.
 */
let async = require('async');
let util = require('../common/util');
let usersDAO = require('../dao/users');

function getUserInfo(params, callback) {
    let userId = params.userId;
    let result = util.validateNull(userId);
    if (!result.success) {
        return callback('id不能为空')
    }
    usersDAO.queryUserById(params, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result.length > 0) {
                delete result[0].password;
                callback(null, result[0]);
            } else {
                callback('用户不存在！')
            }
        }
    });
}

function modifyUserInfo(params, callback) {
    let userId = params.userId;
    let result = util.validateNull(userId);
    if (!result.success) {
        return callback('id不能为空')
    }
    async.waterfall([
        function (next) {
            if (params.field == 'phone') { //如果是修改手机，需检查手机号是否被注册！
                params.phone = params.value;
                usersDAO.queryUserByPhone(params, function (err, result) {
                    if (err) {
                        next(err);
                    } else {
                        //查询结果中的userId与当前userId不一致，则表示这条记录不是当前用户，也就说明该手机号已被注册
                        if (result.length > 0 && result[0].userId != userId) {
                            next('该手机号已被注册！');
                        } else {
                            next()
                        }
                    }
                });
            } else {
                next()
            }
        },
        function (next) {
            usersDAO.modifyUserInfo(params, function (err, result) {
                if (err) {
                    next(err);
                } else {
                    next(null, result);
                }
            });
        }
    ], function (err, result) {
        callback(err, result)
    });


}

module.exports = {
    getUserInfo,
    modifyUserInfo
};
