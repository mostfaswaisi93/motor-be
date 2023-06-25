const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password:{type:String,required:true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isAdmin: {type:Boolean, default:false},
    userName: {type: String},
},{timestamps:true})

module.exports=mongoose.model('user',userSchema);