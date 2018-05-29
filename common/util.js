/**
 * Created by Feil(admin@feil.wang) on 2018/5/12.
 */
let crypto = require('crypto');
let moment = require('moment');
let jwt = require('jwt-simple');
let TOKEN_SECRET = 'CAELUM_SECRET';

let util = {
    validateNull: function (value, message) {
        let result = {success: true};
        if (!value) {
            result.success = false;
            result.message = message;
        }
        return result;
    },
    createPassword: function (password) {
        let md5 = crypto.createHash('md5');
        return md5.update(password).digest('hex');
    },
    generateToken: function (result) {
        let expires = moment().add(7, 'days').valueOf();
        return jwt.encode({
            iss: result.userId,
            exp: expires,
        }, TOKEN_SECRET);
    },
    decodeToken: function (token) {
        return jwt.decode(token, TOKEN_SECRET);
    }
};

module.exports = util;