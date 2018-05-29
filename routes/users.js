let express = require('express');
let router = express.Router();
let userService = require('../service/users');
let util = require('../common/util');


let checkLogin = function (req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.json({
            message: 'token不存在！',
            success: false
        })
    }
    let decodeToken = util.decodeToken(token);
    let exp = decodeToken.exp;
    let userId = decodeToken.iss;
    console.log('decodeToken', decodeToken);
    if (exp < Date.now) {
        return res.json({
            message: '会话失效，请重新登录',
            success: false,
            code: 401
        });
    }
    next(userId);
};

//获取用户信息
router.route('/getUserInfo').all(checkLogin, function (userId, req, res, next) {
    let params;
    if (req.method == "POST") {
        params = req.body;
    } else {
        params = req.query || req.params;
    }
    params.userId = userId;
    console.log('getUserInfo params:', params);
    userService.getUserInfo(params, function (err, result) {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            result.token = util.generateToken(result);
            res.json({
                data: result,
                success: true,
                message: '操作成功！'
            });
        }
    });
});

//修改用户信息
router.route('/modifyUserInfo').all(checkLogin, function (userId, req, res, next) {
    let params;
    if (req.method == "POST") {
        params = req.body;
    } else {
        params = req.query || req.params;
    }
    params.userId = userId;
    console.log('modifyUserInfo params:', params);
    userService.modifyUserInfo(params, function (err, result) {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            res.json({
                success: true,
                message: '操作成功！'
            });
        }
    });
});

module.exports = router;
