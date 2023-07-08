const Management = require("../Models/management");
const Service = require("../Models/service");
const error = require("../Middleware/error");

// get General Management
exports.getGeneralManagement = async (req, res, next) => {
  try {
    let data = await Management.find({ type: "General" }).sort({createdAt: -1})
    res.status(200).json({ message: `get General Management`, data});
  } catch (err) {
    next(err);
  }
};


//create Management
exports.addNewManagement = async (req, res, next) => {
  try {
    if(!req.isAdmin) throw new Error('Not Allowed')
    error(req, res, next);
  
        let obj = new Management({
          image: req.files?.image?.[0]?.filename || '',
          type: req.body.type,
          title:{
            ar: req.body.title_ar,
            en: req.body.title_en,
          },
          description:{
              ar: req.body.description_ar,
              en: req.body.description_en,
          },
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          ...(req.body.type== 'Service' && {serviceId: req.body.serviceId})
        });
    
        const data = await obj.save();

        if(req.body.type == 'Service'){
          await Service.findOneAndUpdate({_id: data.serviceId },{
            $push: { management: data._id }
         }) 
        }
      
    res.status(200).json({ message: `Management Added`, data});
  } catch (err) {
    next(err);
  }
};

//Update Management
exports.updateManagement = async (req, res, next) => {
  try {
    if(!req.isAdmin) throw new Error('Not Allowed')
    error(req, res, next);
  
        let data = await Management.findOneAndUpdate({_id : req.body.managementId},{
          image: req.files.image?.[0] ? req.files?.image?.[0]?.filename : req.body.image,
          title:{
            ar: req.body.title_ar,
            en: req.body.title_en,
          },
          description:{
              ar: req.body.description_ar,
              en: req.body.description_en,
          },
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
        },{new :true})

        if(!data) throw new Error("Management isn't Found")
    
        res.status(201).json({ message: "Management Updated successfully", data });
  } catch (err) {
    next(err);
  }
};

//Delete Management
exports.deleteManagement = async (req, res, next) => {
  try {
    if (!req.isAdmin) throw new Error("Not Allowed") 
    
      let data = await Management.findOneAndDelete({ _id: req.params.id });
      if (data == null) throw new Error("User Is not Found!");
      if(data.serviceId){
        await Service.findOneAndUpdate({_id: data.serviceId },{
           $pull: { management: data._id }
        })
      }

      res.status(200).json({ message: "Management Deleted" });
  } catch (err) {
    next(err);
  }
};
