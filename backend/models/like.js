const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    dreamId:{type:String,required:true},
    like:{type:Number,required:true},
    dislike:{type:Number,required:true}
});

module.exports = mongoose.model("likes",likeSchema);
