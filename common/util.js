/**
 * Created by Feil(admin@feil.wang) on 2018/5/12.
 */
let util = {
    validateNull: function (value, message) {
        let result = {success: true};
        if (!value) {
            result.success = false;
            result.message = message;
        }
        return result;
    }
};

module.exports = util;