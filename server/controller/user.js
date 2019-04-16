var path = require('path');
var result = require('../config/index');
var UsersModel = require(resolve('../model/user'));
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = [
    {
        method: 'post',
        url: '/api/login',
        func: function (req, res) {
            UsersModel.find({ phone: new RegExp(req.body.phone) }, function (err, docs) {
                if (err) return;

                result.msg = !docs.length ? '该手机号还未注册' : '登录成功';
                result.data = docs;
                result.success = !!docs.length;
                res.json(result);
            });
        }
    },
    {
        method: 'post',
        url: '/api/register',
        func: function (req, res) {
            UsersModel.find({ phone: new RegExp(req.body.phone) }, function (err, docs) {
                if (err) return;
                if (!docs.length) {
                    var user = new UsersModel({
                        phone: req.body.phone,
                        password: req.body.password
                    });
                    user.save(function (err, doc) {
                        result.msg = '注册成功，请登录';
                        res.json(result);
                    });
                } else {
                    result.success = false;
                    result.msg = '该手机号已注册，请直接登录';
                    res.json(result);
                }
            });
        }
    }
];