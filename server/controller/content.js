
var path = require('path');
var result = require('../config/index');
var contentModel = require(resolve('../model/content'));
function resolve(dir) {
    return path.join(__dirname, dir)
}
function handleNum(val) {
    return ('00' + val).substr(-2);
}
function handleErr(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
}

module.exports = [
    {
        method: 'post',
        url: '/api/content/save',
        func: function (req, res) {
            let body = req.body, condi = { userId: body.userId, time: body.time };
            contentModel.find(condi, function (err, docs) {
                if (err) return;
                if (!docs.length) {
                    var content = new contentModel({
                        userId: body.userId,
                        time: body.time,
                        content: body.value
                    });
                    content.save(function (err, doc) {
                        result.msg = '修改成功';
                        res.json(result);
                    });
                } else {
                    if (!body.value) {
                        contentModel.remove(condi, handleErr)
                    } else {
                        contentModel.updateOne(condi, { content: body.value }, handleErr);
                    }
                }
            })
        }
    },
    {
        method: 'post',
        url: '/api/content/all',
        func: function (req, res) {
            var neYe, neMon, body = req.body, bool = body.month == 12;

            neYe = bool ? (body.year + 1) : body.year;
            neMon = bool ? 1 : (body.month + 1);

            contentModel.find({ userId: body.userId, time: { $gte: Number(body.year + handleNum(body.month) + '01'), $lt: Number(neYe + handleNum(neMon) + '01') } }, function (err, docs) {
                if (err) return;
                result.data = !docs.length ? [] : docs;
                result.msg = '成功';
                res.json(result);
            })
        }
    }
];