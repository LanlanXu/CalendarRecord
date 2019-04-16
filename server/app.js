var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var arr = require('./controller/index');
var cross = require('./config/cross');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
function resolve(dir) {
    return path.join(__dirname, dir)
}

app.use(express.static(resolve('../webapp')));
app.use(express.static(resolve('../webapp/static')));
app.use(express.static(resolve('../webapp/fonts')));

app.use(function (req, res, next) {
    //自定义中间件，设置跨域需要的响应头
    for (let key in cross) {
        res.header(key, cross[key]);
    }
    next();
});//运用跨域的中间件

for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    app[item.method](item.url, jsonParser, item.func);
}
// var UsersModel = require(resolve('model/user'));
// app.post('/api/login', jsonParser, function (req, res) {
//     console.log(req.body.phone);

//     UsersModel.find({ phone: new RegExp(req.body.phone) }, function (err, docs) {
//         if (!err) {
//             if (!docs.length) {
//                 result.success = false;
//                 result.msg = '该手机号还未注册';
//                 res.json(result);
//             } else {
//                 result.data = docs;
//                 result.msg = '登录成功';
//                 result.success = true;
//                 res.json(result);
//             }

//         }
//     });
// });

// app.post('/api/register', jsonParser, function (req, res) {
//     UsersModel.find({ phone: new RegExp(req.body.phone) }, function (err, docs) {
//         if (!err) {
//             if (!docs.length) {
//                 var user = new UsersModel({
//                     phone: req.body.phone,
//                     password: req.body.password
//                 });
//                 user.save(function (err, doc) {
//                     result.msg = '注册成功，请登录';
//                     res.json(result);
//                 });
//             } else {
//                 result.success = false;
//                 result.msg = '该手机号已注册，请直接登录';
//                 res.json(result);
//             }

//         }
//     });
// });

// var contentModel = require(resolve('model/content'));
// app.post('/api/content/save', jsonParser, function (req, res) {
//     contentModel.find({ userId: req.body.userId, time: req.body.time }, function (err, docs) {
//         if (!err) {
//             if (!docs.length) {
//                 var content = new contentModel({
//                     userId: req.body.userId,
//                     time: req.body.time,
//                     content: req.body.value
//                 });
//                 content.save(function (err, doc) {
//                     result.msg = '修改成功';
//                     res.json(result);
//                 });
//             } else {
//                 if (!req.body.value) {
//                     contentModel.remove({ userId: req.body.userId, time: req.body.time }, function (err, res) {
//                         if (err) {
//                             console.log(err);
//                         } else {
//                             console.log(res);
//                         }
//                     })
//                 } else {
//                     contentModel.updateOne({ userId: req.body.userId, time: req.body.time }, { content: req.body.value }, function (err, res) {
//                         if (err) {
//                             console.log(err);
//                         } else {
//                             console.log(res);
//                         }
//                     });
//                 }

//             }
//         }
//     })
// });
// function handleNum(val) {
//     return ('00' + val).substr(-2);
// }
// app.post('/api/content/all', jsonParser, function (req, res) {
//     if (req.body.month == 12) {
//         var neYe = req.body.year + 1;
//         var neMon = 1;
//     } else {
//         var neYe = req.body.year;
//         var neMon = req.body.month + 1;
//     }
//     contentModel.find({ userId: req.body.userId, time: { $gte: Number(req.body.year + handleNum(req.body.month) + '01'), $lt: Number(neYe + handleNum(neMon) + '01') } }, function (err, docs) {

//         if (!err) {
//             console.log(docs);
//             if (!docs.length) {
//                 result.msg = '成功';
//                 result.data = [];
//                 res.json(result);
//             } else {
//                 result.msg = '成功';
//                 result.data = docs;
//                 res.json(result);
//             }
//         }
//     })
// });



mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err) {
        console.log(err, '数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(3300);
    }
});