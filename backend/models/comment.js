const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    dreamId :{type:String,required:true},
    name:{type:String,required:true},
    content:{type:String,required:true},
})

module.exports = mongoose.model("comment",commentSchema);