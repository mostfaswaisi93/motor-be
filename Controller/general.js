const General = require("../Models/general");
const error = require("../Middleware/error");

//Update header
exports.updateHeader = async (req, res, next) => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed')
    error(req, res, next)
    
    let media = []
    req.files?.media?.length && req.files.media.forEach((file)=>{
        media.push(file.filename)
    })
    req.body.oldMedia && media.push(...req.body.oldMedia.split(','))

    let data = await General.findOneAndUpdate({},{
      header:{
        logo: req.files.logo ? req.files.logo[0]?.filename : req.body.logo,
        media,
        title:{
          ar: req.body.title_ar,
          en: req.body.title_en,
        },
        description:{
            ar: req.body.description_ar,
            en: req.body.description_en,
        },
        question:{
        ar: req.body.question_ar,
        en: req.body.question_en,
        }
      }
    },{upsert: true, new: true})
    
      res.status(200).json({ message: "Header Updated",success: true, data: data?.header });
  } catch (err) {
    next(err);
  }
};

//get Header
exports.getHeader = async (req, res, next) => {
  try {
      let data = await General.findOne({}, {header: 1, socialMedia: 1, _id: 0})
      res.status(200).json({ message: "Get Header",success: true, data });
  } catch (err) {
    next(err);
  }
};

//Update Social Media
exports.updateSocialMedia = async (req, res, next) => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed')
    
    let data = await General.findOneAndUpdate({},{
        socialMedia:{
          snapChat: req.body.snapChat,
          instagram: req.body.instagram,
          tiktok: req.body.tiktok,
          youtube: req.body.youtube,
          facebook: req.body.facebook,
          twitter: req.body.twitter,
        }
      },{upsert: true, new: true})
    
      res.status(200).json({ message: "social Media Updated",success: true, data: data?.socialMedia });
  } catch (err) {
    next(err);
  }
};

//get Social Media
exports.getSocialMedia = async (req, res, next) => {
  try {
      let data = await General.findOne({}, {socialMedia: 1, _id: 0})
      res.status(200).json({ message: "Get social Media",success: true, data });
  } catch (err) {
    next(err);
  }
};

//Update Contact Us
exports.updateContactUs = async (req, res, next) => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed')
    error(req, res, next)
    
    let data = await General.findOneAndUpdate({},{
      contactUs:{
        city:{
          ar: req.body.city_ar,
          en: req.body.city_en,
        },
        country:{
          ar: req.body.country_ar,
          en: req.body.country_en,
        },
        address:{
          ar: req.body.address_ar,
          en: req.body.address_en,
        },
        email:{
          primary: req.body.primaryEmail,
          secondary: req.body.secondaryEmail,
        },
        phoneNumber:{
          primary: req.body.primaryPhoneNumber,
          secondary: req.body.secondaryPhoneNumber
        },
      }
    },{upsert: true, new: true})
    
      res.status(200).json({ message: "contact Us Updated",success: true, data: data?.contactUs });
  } catch (err) {
    next(err);
  }
};

//get Contact Us
exports.getContactUs = async (req, res, next) => {
  try {
      let data = await General.findOne({}, { contactUs: 1, _id: 0})
      res.status(200).json({ message: "Get contact Us",success: true, data });
  } catch (err) {
    next(err);
  }
};


//Update who we are
exports.updateWhoWeAre = async (req, res, next) => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed')
    error(req, res, next)
    
    let media = []
    req.files?.media?.length && req.files.media.forEach((file)=>{
        media.push(file.filename)
    })
    
    req.body.oldMedia && media.push(...req.body.oldMedia.split(','))

    let data = await General.findOneAndUpdate({},{
      whoAreWe:{
        media,
        title:{
          ar: req.body.title_ar,
          en: req.body.title_en,
        },
        description:{
            ar: req.body.description_ar,
            en: req.body.description_en,
        },
       }
    },{upsert: true, new: true})
    
      res.status(200).json({ message: "who We Are Updated",success: true, data: data?.whoAreWe });
  } catch (err) {
    next(err);
  }
};

//get Who We Are
exports.getWhoWeAre = async (req, res, next) => {
  try {
      let data = await General.findOne({}, {whoAreWe: 1, _id: 0})
      res.status(200).json({ message: "Get who We Are",success: true, data });
  } catch (err) {
    next(err);
  }
};

//Update what Do We Apply
exports.updateWhatDoWeApply = async (req, res, next) => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed')
    error(req, res, next)
    
    let data = await General.findOneAndUpdate({},{
      whatDoWeApply:{
        title:{
          ar: req.body.title_ar,
          en: req.body.title_en,
        },
        description:{
            ar: req.body.description_ar,
            en: req.body.description_en,
        },
      }
    },{upsert: true, new: true})
    
      res.status(200).json({ message: "What Do We Apply Updated",success: true, data: data?.whatDoWeApply });
  } catch (err) {
    next(err);
  }
};

//get What Do We Apply
exports.getWhatDoWeApply = async (req, res, next) => {
  try {
      let data = await General.findOne({}, { whatDoWeApply: 1, _id: 0})
      res.status(200).json({ message: "Get What Do We Apply",success: true, data });
  } catch (err) {
    next(err);
  }
};
