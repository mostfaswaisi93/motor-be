import Management from "../Models/management";
import Service from "../Models/service";
import error from "../Middleware/error";
import { Request, Response, NextFunction } from "express";
import { ManagementType } from "../Models/management";

interface ManagementRequest extends Request {
  isAdmin?: boolean;
  body: {
    type: ManagementType;
    title_ar: string;
    title_en: string;
    description_ar: string;
    description_en: string;
    phoneNumber: number;
    email?: string;
    serviceId?: string;
    managementId?: string;
    image?: string;
  };
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
  params: {
    id: string;
    serviceId: string;
  };
}

// get General Management
export const getGeneralManagement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let data = await Management.find({ type: "General" }).sort({ createdAt: -1 });
    res.status(200).json({ message: `get General Management`, success: true, data });
  } catch (err) {
    next(err);
  }
};

//create Management
export const addNewManagement = async (req: ManagementRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed');
    error(req, res, next);

    let obj = new Management({
      image: req.files?.image?.[0]?.filename || '',
      type: req.body.type,
      title: {
        ar: req.body.title_ar,
        en: req.body.title_en,
      },
      description: {
        ar: req.body.description_ar,
        en: req.body.description_en,
      },
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      ...(req.body.type == 'Service' && { serviceId: req.body.serviceId })
    });

    const data = await obj.save();

    if (req.body.type == 'Service') {
      await Service.findOneAndUpdate({ _id: data.serviceId }, {
        $push: { management: data._id }
      });
    }

    res.status(200).json({ message: `Management Added`, success: true, data });
  } catch (err) {
    next(err);
  }
};

//Update Management
export const updateManagement = async (req: ManagementRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed');
    error(req, res, next);

    let data = await Management.findOneAndUpdate({ _id: req.body.managementId }, {
      image: req.files?.image?.[0] ? req.files?.image?.[0]?.filename : req.body.image ? req.body.image : '',
      title: {
        ar: req.body.title_ar,
        en: req.body.title_en,
      },
      description: {
        ar: req.body.description_ar,
        en: req.body.description_en,
      },
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    }, { new: true });

    if (!data) throw new Error("Management isn't Found");

    res.status(201).json({ message: "Management Updated successfully", success: true, data });
  } catch (err) {
    next(err);
  }
};

//Delete Management
export const deleteManagement = async (req: ManagementRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.isAdmin) throw new Error("Not Allowed");

    let data = await Management.findOneAndDelete({ _id: req.params.id });
    if (data == null) throw new Error("User Is not Found!");
    if (data.serviceId) {
      await Service.findOneAndUpdate({ _id: data.serviceId }, {
        $pull: { management: data._id }
      });
    }

    res.status(200).json({ message: "Management Deleted", success: true });
  } catch (err) {
    next(err);
  }
};

//get Managements For Service
export const getManagementsForService = async (req: ManagementRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let data = await Management.find({ serviceId: req.params.serviceId });
    if (data == null) throw new Error("User Is not Found!");

    res.status(200).json({ message: "Fetching Service Managements", success: true, data });
  } catch (err) {
    next(err);
  }
};

