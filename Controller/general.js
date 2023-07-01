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
    req.body.oldMedia && media.push(...JSON.parse(req.body.oldMedia))

    let data = await General.findOneAndUpdate({},{
      header:{
        logo: req.files.logo ? req.files.logo[0]?.filename : req.body.logo,
        media,
        title_ar: req.body.title_ar,
        title_en: req.body.title_en,
        description_ar: req.body.description_ar,
        description_en: req.body.description_en,
        question_en: req.body.question_en,
        question_ar: req.body.question_ar,    
      }
    },{upsert: true, new: true})
    
      res.status(200).json({ message: "Header Updated", data: data?.header });
  } catch (err) {
    next(err);
  }
};

//get Header
exports.getHeader = async (req, res, next) => {
  try {
      let data = await General.findOne({}, {header: 1, socialMedia: 1, _id: 0})
      res.status(200).json({ message: "Get Header", data });
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
    
      res.status(200).json({ message: "social Media Updated", data: data?.socialMedia });
  } catch (err) {
    next(err);
  }
};

//get Social Media
exports.getSocialMedia = async (req, res, next) => {
  try {
      let data = await General.findOne({}, {socialMedia: 1, _id: 0})
      res.status(200).json({ message: "Get social Media", data });
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
        city_ar: req.body.city_ar,
        city_en: req.body.city_en,
        country_ar: req.body.country_ar,
        country_en: req.body.country_en,
        address_ar: req.body.address_ar,
        address_en: req.body.address_en,
        primaryEmail: req.body.primaryEmail,
        secondaryEmail: req.body.secondaryEmail,
        primaryPhoneNumber: req.body.primaryPhoneNumber,
        secondaryPhoneNumber: req.body.secondaryPhoneNumber
      }
    },{upsert: true, new: true})
    
      res.status(200).json({ message: "contact Us Updated", data: data?.contactUs });
  } catch (err) {
    next(err);
  }
};

//get Contact Us
exports.getContactUs = async (req, res, next) => {
  try {
      let data = await General.findOne({}, { contactUs: 1, _id: 0})
      res.status(200).json({ message: "Get contact Us", data });
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
    
    req.body.oldMedia && media.push(...JSON.parse(req.body.oldMedia))

    let data = await General.findOneAndUpdate({},{
      whoAreWe:{
        media,
        title_ar: req.body.title_ar,
        title_en: req.body.title_en,
        description_ar: req.body.description_ar,
        description_en: req.body.description_en,
       }
    },{upsert: true, new: true})
    
      res.status(200).json({ message: "who We Are Updated", data: data?.whoAreWe });
  } catch (err) {
    next(err);
  }
};

//get Who We Are
exports.getWhoWeAre = async (req, res, next) => {
  try {
      let data = await General.findOne({}, {whoAreWe: 1, _id: 0})
      res.status(200).json({ message: "Get who We Are", data });
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
        title_ar: req.body.title_ar,
        title_en: req.body.title_en,
        description_ar: req.body.description_ar,
        description_en: req.body.description_en,
      }
    },{upsert: true, new: true})
    
      res.status(200).json({ message: "What Do We Apply Updated", data: data?.whatDoWeApply });
  } catch (err) {
    next(err);
  }
};

//get What Do We Apply
exports.getWhatDoWeApply = async (req, res, next) => {
  try {
      let data = await General.findOne({}, { whatDoWeApply: 1, _id: 0})
      res.status(200).json({ message: "Get What Do We Apply", data });
  } catch (err) {
    next(err);
  }
};
