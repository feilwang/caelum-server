/**
 * Created by Feil(admin@feil.wang) on 2018/5/12.
 */
let express = require('express');
let router = express.Router();
let signService = require('../service/sign');
let util = require('../common/util');


//注册
router.route('/register').all(function (req, res, next) {
    let params;
    if (req.method == "POST") {
        params = req.body;
    } else {
        params = req.query || req.params;
    }
    console.log('register params:', params);
    signService.register(params, function (err, result) {
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
                message: '注册成功！'
            });
        }
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
    signService.login(params, function (err, result) {
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
                message: '登录成功！'
            });
        }
    });
});


module.exports = router;