const mongoose = require("mongoose");

const pubSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"login",required:true},
    name:{type:String},
    date:{type:Date,required:true},
    dream:{type:String,required:true},
    type:{type:String,required:true},
    characters:{type:[String],required:true},
    scenario:{type:String,required:true},
})

module.exports = mongoose.model("pubdream",pubSchema);