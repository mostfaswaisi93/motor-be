const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    logo: String,
    title_ar: String,
    title_en: String,
    description_ar: String,
    description_en: String,
    whatsappLink: String,
    media:Array,
    managment: {type: mongoose.Types.ObjectId, ref:"managment"}
},{timestamps:true})

module.exports=mongoose.model('service',serviceSchema);