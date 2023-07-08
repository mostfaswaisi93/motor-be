const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    logo: String,
    title:{
        ar: String,
        en: String,
      },
      description:{
          ar: String,
          en: String,
      },
    whatsappLink: String,
    media:Array,
    management: [{type: mongoose.Types.ObjectId, ref:"management"}]
},{timestamps:true})

module.exports=mongoose.model('service',serviceSchema);