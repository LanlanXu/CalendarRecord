var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
    _id: Number,
    content: String
},
    {
        timestamps: true
    });
module.exports = mongoose.model('content', blogSchema);
