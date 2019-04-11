var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
    _id: String,
    content: String
},
    {
        timestamps: true
    });
module.exports = mongoose.model('content', blogSchema);
