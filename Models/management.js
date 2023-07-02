const mongoose = require('mongoose');

const managementSchema = new mongoose.Schema({
    type: {type: String, enum:['General', 'Service']},
    title_ar: String,
    title_en: String,
    description_ar: String,
    description_en: String,
    phoneNumber: Number,
    email: String,
    image: String,
    serviceId: {type: mongoose.Types.ObjectId, ref:'service'}
},{timestamps:true})

module.exports=mongoose.model('management',managementSchema);