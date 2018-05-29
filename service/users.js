/**
 * Created by Feil(admin@feil.wang) on 2018/5/29.
 */
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
    usersDAO.modifyUserInfo(params, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

module.exports = {
    getUserInfo,
    modifyUserInfo
};
