const Service = require("../Models/service");
const Management = require("../Models/management");
const error = require("../Middleware/error");

// get All Services
exports.getAllServices = async (req, res, next) => {
  try {
    let data = await Service.find({}).populate('management').sort({createdAt: -1})
    res.status(200).json({ message: `Get All Services`,success: true, data})
  } catch (err) {
    next(err);
  }
};

// get Service By Id
exports.getServiceById = async (req, res, next) => {
  try {
    let data = await Service.findOne({_id: req.params.id}).populate('management')
    if(!data) throw new Error("Service isn't Found")
    res.status(200).json({ message: `Get Service by Id`,success: true, data})
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
      logo: req.files?.logo? req.files.logo?.[0]?.filename : '',
      title:{
        ar: req.body.title_ar,
        en: req.body.title_en,
      },
      description:{
          ar: req.body.description_ar,
          en: req.body.description_en,
      },      whatsappLink: req.body.whatsappLink,
      media,
    });

    const data = await obj.save();

    res.status(200).json({ message: `Service Added`, success: true, data});
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
    req.body.oldMedia && media.push(...req.body.oldMedia.split(','))
    
    let data = await Service.findOneAndUpdate({_id: req.body.serviceId},{
      logo: req.files?.logo?.[0] ? req.files?.logo?.[0].filename : req.body.logo ? req.body.logo : '',
      title:{
        ar: req.body.title_ar,
        en: req.body.title_en,
      },
      description:{
          ar: req.body.description_ar,
          en: req.body.description_en,
      },
      whatsappLink: req.body.whatsappLink,
      media,
    },{
      new: true
    })

    if (!data) throw new Error('Service isnot Found') 

    res.status(201).json({ message: "Service Updated successfully",success: true, data });
  } catch (err) {
    next(err);
    console.log(err)
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

      res.status(200).json({ message: "Service Deleted",success: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    if (!req.isAdmin) throw new Error("Not Allowed") 
    
    let data = await Service.findOneAndUpdate({_id: req.params.serviceId},{
      $pull: { questions: {_id: req.params.questionId}} 
     },{new: true})

      res.status(200).json({ message: "Question Deleted", success: true, });
  } catch (err) {
    next(err);
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    if (!req.isAdmin) throw new Error("Not Allowed") 
    
    let data = await Service.findOneAndUpdate({_id: req.body.serviceId, 'questions._id': req.body.questionId},{
        $set: {
              'questions.$.question.ar': req.body.question_ar,
              'questions.$.question.en': req.body.question_en,
              'questions.$.answer.ar': req.body.answer_ar,
              'questions.$.answer.en': req.body.answer_en,
            }
    },{new: true})

      res.status(200).json({ message: "Question Updated",success: true, data: data.questions });
  } catch (err) {
    next(err);
  }
};

exports.addQuestion = async (req, res, next) => {
  try {
    if (!req.isAdmin) throw new Error("Not Allowed") 
    
    let data = await Service.findOneAndUpdate({_id: req.body.serviceId},{
       $push: { questions: {
          question:{
            ar: req.body.question_ar,
            en: req.body.question_en,
          },
          answer:{
            ar: req.body.answer_ar,
            en: req.body.answer_en,
          }
       }} 
    },{new: true})

      res.status(200).json({ message: "Question Added",success: true, data: data.questions });
  } catch (err) {
    next(err);
  }
};

exports.getServiceQuestions = async (req, res, next) => {
  try {
    if (!req.isAdmin) throw new Error("Not Allowed") 
    
    let data = await Service.findOne({_id: req.params.serviceId},{questions: 1, "title.ar": 1, "title.en" :1})

    res.status(200).json({ message: "Fetching Questions",success: true, data });
  } catch (err) {
    next(err);
  }
};
