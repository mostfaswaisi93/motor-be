const Service = require("../Models/service");
const Management = require("../Models/management");
const error = require("../Middleware/error");

// get All Services
exports.getAllServices = async (req, res, next) => {
  try {
    let data = await Service.find({}).populate('management').sort({createdAt: -1})
    res.status(200).json({ message: `Get All Services`, data})
  } catch (err) {
    next(err);
  }
};

// get Service By Id
exports.getServiceById = async (req, res, next) => {
  try {
    let data = await Service.findOne({_id: req.params.id}).populate('management')
    if(!data) throw new Error("Service isn't Found")
    res.status(200).json({ message: `Get Service by Id`, data})
  } catch (err) {
    next(err);
  }
};

//Add New Service
exports.addNewService = async (req, res, next) => {
  try {
    if(!req.isAdmin) throw new Error('Not Allowed')
    error(req, res, next);

    let media = []
    req.files?.media?.length && req.files.media.forEach((file)=>{
        media.push(file.filename)
    })

    let obj = new Service({
      logo: req.files?.logo?.[0]?.filename,
      title_ar: req.body.title_ar,
      title_en: req.body.title_en,
      description_ar: req.body.description_ar,
      description_en: req.body.description_en,
      whatsappLink: req.body.whatsappLink,
      media,
    });

    const data = await obj.save();

    res.status(200).json({ message: `Service Added`, data});
  } catch (err) {
    next(err);
  }
};

//Update Service
exports.updateService = async (req, res, next) => {
  try {
    error(req, res, next);
    if (!req.isAdmin) throw new Error("Not Allowed!");
    
    let media = []
    req.files?.media?.length && req.files.media.forEach((file)=>{
        media.push(file.filename)
    })
    req.body.oldMedia && media.push(...JSON.parse(req.body.oldMedia))
    
    let data = await Service.findOneAndUpdate({_id: req.body.serviceId},{
      logo: req.files.logo?.[0] ? req.files.logo?.[0].filename : req.body.logo,
      title_ar: req.body.title_ar,
      title_en: req.body.title_en,
      description_ar: req.body.description_ar,
      description_en: req.body.description_en,
      whatsappLink: req.body.whatsappLink,
      media,
    },{
      new: true
    })

    if (!data) throw new Error('Service isnot Found') 

    res.status(201).json({ message: "Service Updated successfully", data });
  } catch (err) {
    next(err);
  }
};

//Delete Service
exports.deleteService = async (req, res, next) => {
  try {
    if (!req.isAdmin) throw new Error("Not Allowed") 
    
      let data = await Service.findOneAndDelete({_id: req.params.id });
      if (data == null) throw new Error("Service Is not Found!");
      if (data.management.length){
        data.management.forEach(async (item)=>{
          await Management.deleteOne({_id: item})
        })
      }

      res.status(200).json({ message: "Service Deleted" });
  } catch (err) {
    next(err);
  }
};
