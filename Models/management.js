const mongoose = require('mongoose');

const managementSchema = new mongoose.Schema({
    type: {type: String, enum:['General', 'Service']},
    title:{
        ar: String,
        en: String,
    },
    description:{
        ar: String,
        en: String,
    },
    phoneNumber: Number,
    email: String,
    image: String,
    serviceId: {type: mongoose.Types.ObjectId, ref:'service'}
},{timestamps:true})

module.exports=mongoose.model('management',managementSchema);