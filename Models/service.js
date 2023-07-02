const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    logo: String,
    title_ar: String,
    title_en: String,
    description_ar: String,
    description_en: String,
    whatsappLink: String,
    media:Array,
    management: [{type: mongoose.Types.ObjectId, ref:"management"}]
},{timestamps:true})

module.exports=mongoose.model('service',serviceSchema);