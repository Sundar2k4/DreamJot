const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    userid:{type:String,required:true},
    like:{type:Number,required:true},
    dislike:{type:Number,required:true}
});

module.exports = mongoose.model("likes",likeSchema);
