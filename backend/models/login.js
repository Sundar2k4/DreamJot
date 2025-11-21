const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const loginSchema = new mongoose.Schema({
    name:{type:String,required:true},
    password:{type:String,required:true},
})

loginSchema.pre("save",async function(next){
     if(!this.isModified("password")) return next();

     this.password = await bcrypt.hash(this.password,10);
     next();
});

module.exports = mongoose.model('login',loginSchema);