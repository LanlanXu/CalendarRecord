var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var result = require('./config/index');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

function resolve(dir) {
    return path.join(__dirname, dir)
}

app.use(express.static(resolve('../webapp')));
app.use(express.static(resolve('../webapp/static')));
app.use(express.static(resolve('../webapp/fonts')));

// app.use('*', function(req, res, next){
//     next();
// });

var UsersModel = require(resolve('model/user'));
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');//自定义中间件，设置跨域需要的响应头。
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
};

app.use(allowCrossDomain);//运用跨域的中间件
app.post('/api/login', jsonParser, function (req, res) {
    console.log(req.body.phone);

    UsersModel.find({ phone: new RegExp(req.body.phone) }, function (err, docs) {
        if (!err) {
            if (!docs.length) {
                result.success = false;
                result.msg = '该手机号还未注册';
                res.json(result);
            } else {
                result.data = docs;
                result.msg = '登录成功';
                result.success = true;
                res.json(result);
            }

        }
    });
});

app.post('/api/register', jsonParser, function (req, res) {
    UsersModel.find({ phone: new RegExp(req.body.phone) }, function (err, docs) {
        if (!err) {
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

        }
    });
});

var contentModel = require(resolve('model/content'));
app.post('/api/content/save', jsonParser, function (req, res) {
    contentModel.find({ _id: req.body.id }, function (err, docs) {
        console.log('xll');
        console.log(err);
        if (!err) {
            console.log(docs);
            if (!docs.length) {
                var content = new contentModel({
                    _id: req.body.id,
                    content: req.body.value
                });
                content.save(function (err, doc) {
                    result.msg = '修改成功';
                    res.json(result);
                });
            } else {
                contentModel.updateOne({ _id: req.body.id }, { content: req.body.value }, function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(res);
                    }
                });
            }
        }
    })
});
function handleNum(val) {
    return ('00' + val).substr(-2);
}
app.post('/api/content/all', jsonParser, function (req, res) {
    if (req.body.month == 12) {
        var neYe = req.body.year + 1;
        var neMon = 1;
    } else {
        var neYe = req.body.year;
        var neMon = req.body.month + 1;
    }
    console.log(req.body.year + handleNum(req.body.month) + '01');
    console.log(neYe + handleNum(neMon) + '01');
    contentModel.find({ _id: { $gte: Number(req.body.year + handleNum(req.body.month) + '01'), $lt: Number(neYe + handleNum(neMon) + '01') } }, function (err, docs) {

        if (!err) {
            console.log(docs);
            if (!docs.length) {
                result.msg = '成功';
                result.data = [];
                res.json(result);
            } else {
                result.msg = '成功';
                result.data = docs;
                res.json(result);
            }
        }
    })
});



mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err) {
        console.log(err, '数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(3300);
    }
});