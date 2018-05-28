/**
 * Created by Feil(admin@feil.wang) on 2018/5/12.
 */
let express = require('express');
let router = express.Router();
let signDAO = require('../dao/sign');

//注册
router.route('/register').all(function (req, res, next) {
    let params;
    if (req.method == "POST") {
        params = req.body;
    } else {
        params = req.query || req.params;
    }
    console.log('register params:', params);
    signDAO.register(params, function (err, result) {
        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }
        res.json({
            success: true,
            message: '注册成功！'
        });
    });
});


//登录
router.route('/login').all(function (req, res, next) {
    let params;
    if (req.method == "POST") {
        params = req.body;
    } else {
        params = req.query || req.params;
    }
    console.log('login params:', params);
    signDAO.login(params, function (err, result) {
        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }
        if (result.length > 0) {
            delete result[0].password;
            res.json({
                data: result[0],
                success: true,
                message: '登录成功！'
            });
        } else {
            res.json({
                success: false,
                message: '用户名或密码错误！'
            });
        }
    });
});

module.exports = router;