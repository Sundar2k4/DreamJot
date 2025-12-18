const mongoose = require ('mongoose');

const dreamSchema = new mongoose.Schema({
       userId:{type:mongoose.Schema.Types.ObjectId,ref:"login",required:true},
       date:{type:Date,required:true},
       dream:{type:String,required:true},
       type:{type:String,required:true},
       characters:{type:[String],required:true},
});

module.exports = mongoose.model("dream",dreamSchema);