const mongoose = require('mongoose');

const managmentSchema = new mongoose.Schema({
    title_ar: String,
    title_en: String,
    description_ar: String,
    description_en: String,
    phoneNumber_ar: Number,
    phoneNumber_en: Number,
    email: String,
    image: String
},{timestamps:true})

module.exports=mongoose.model('managment',managmentSchema);