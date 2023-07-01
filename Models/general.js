const mongoose = require('mongoose');

const generalSchema = new mongoose.Schema({

    header:{
        logo: String,
        title_ar: String,
        title_en: String,
        description_ar: String,
        description_en: String,
        question_en: String,
        question_ar: String,
        media: Array
    },
    socialMedia:{
        snapChat: String,
        instagram: String,
        tiktok: String,
        youtube: String,
        facebook: String,
        twitter: String,
    },
    contactUs:{
        city_ar:String,
        city_en:String,
        country_ar:String,
        country_en:String,
        address_ar:String,
        address_en:String,
        primaryEmail: String,
        secondaryEmail: String,
        primaryPhoneNumber: Number,
        secondaryPhoneNumber: Number,
    }, 
    whoAreWe:{
        title_ar: String,
        title_en: String,
        description_ar: String,
        description_en: String,
        media: Array
    },
    whatDoWeApply:{
        title_ar: String,
        title_en: String,
        description_ar: String,
        description_en: String,
    }
},{timestamps:true})

module.exports=mongoose.model('general',generalSchema);