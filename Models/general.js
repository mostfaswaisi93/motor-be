const mongoose = require('mongoose');

const generalSchema = new mongoose.Schema({

    header:{
        logo: String,
        title:{
            ar: String,
            en: String,
        },
        description:{
            ar: String,
            en: String,
        },
        question:{
            en: String,
            ar: String,
        },
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
        city:{
            ar:String,
            en:String,
        },
        country:{
            ar:String,
            en:String,
        },
        address:{
            ar:String,
            en:String,
        },
        email:{
            primary: String,
            secondary: String,
        },
        phoneNumber:{
            primary: Number,
            secondary: Number,
        }
    }, 
    whoAreWe:{
        title:{
            ar: String,
            en: String,
        },
        description:{
            ar: String,
            en: String,
        },
        media: Array
    },
    whatDoWeApply:{
        title:{
            ar: String,
            en: String,
        },
        description:{
            ar: String,
            en: String,
        },
    },
    ourGoals:{
        image: String,
        title:{
            ar: String,
            en: String,
        },
        description1:{
            ar: String,
            en: String,
        },
        description2:{
            ar: String,
            en: String,
        },
    },
    ourCommitments:{
        image: String,
        title:{
            ar: String,
            en: String,
        },
        description1:{
            ar: String,
            en: String,
        },
        description2:{
            ar: String,
            en: String,
        },
    }
},{timestamps:true})

module.exports=mongoose.model('general',generalSchema);