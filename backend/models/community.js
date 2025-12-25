const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    comunityid:{type:String,required:true},
    title:{type:String,required:true},
    desc:{type:String,required:true},
    profilepic:{type:String},
})

module.exports = mongoose.model("community",communitySchema);

