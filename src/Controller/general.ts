import General from "../Models/general";
import error from "../Middleware/error";
import { Request, Response, NextFunction } from "express";

interface GeneralRequest extends Request {
  isAdmin?: boolean;
  body: {
    logo?: string;
    oldMedia?: string;
    title_ar: string;
    title_en: string;
    description_ar: string;
    description_en: string;
    question_ar: string;
    question_en: string;
    snapChat?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    facebook?: string;
    twitter?: string;
    city_ar: string;
    city_en: string;
    country_ar: string;
    country_en: string;
    address_ar: string;
    address_en: string;
    primaryEmail: string;
    secondaryEmail?: string;
    primaryPhoneNumber: number;
    secondaryPhoneNumber?: number;
    description_ar1: string;
    description_en1: string;
    description_ar2: string;
    description_en2: string;
    image?: string;
  };
}

//Update header
export const updateHeader = async (req: GeneralRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed');
    error(req, res, next);
    
    let media: string[] = [];
    if ((req.files as any)?.media?.length) {
      (req.files as any).media.forEach((file: any) => {
        media.push(file.filename);
      });
    }
    if (req.body.oldMedia) {
      media.push(...req.body.oldMedia.split(','));
    }

    let data = await General.findOneAndUpdate({}, {
      header: {
        logo: (req.files as any)?.logo ? (req.files as any).logo[0]?.filename : req.body.logo ? req.body.logo : "",
        media,
        title: {
          ar: req.body.title_ar,
          en: req.body.title_en,
        },
        description: {
          ar: req.body.description_ar,
          en: req.body.description_en,
        },
        question: {
          ar: req.body.question_ar,
          en: req.body.question_en,
        }
      }
    }, { upsert: true, new: true });
    
    res.status(200).json({ message: "Header Updated", success: true, data: data?.header });
  } catch (err) {
    next(err);
  }
};

//get Header
export const getHeader = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let data = await General.findOne({}, { header: 1, socialMedia: 1, _id: 0 });
    res.status(200).json({ message: "Get Header", success: true, data });
  } catch (err) {
    next(err);
  }
};

//Update Social Media
export const updateSocialMedia = async (req: GeneralRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed');
    
    let data = await General.findOneAndUpdate({}, {
      socialMedia: {
        snapChat: req.body.snapChat,
        instagram: req.body.instagram,
        tiktok: req.body.tiktok,
        youtube: req.body.youtube,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
      }
    }, { upsert: true, new: true });
    
    res.status(200).json({ message: "social Media Updated", success: true, data: data?.socialMedia });
  } catch (err) {
    next(err);
  }
};

//get Social Media
export const getSocialMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let data = await General.findOne({}, { socialMedia: 1, _id: 0 });
    res.status(200).json({ message: "Get social Media", success: true, data });
  } catch (err) {
    next(err);
  }
};

//Update Contact Us
export const updateContactUs = async (req: GeneralRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed');
    error(req, res, next);
    
    let data = await General.findOneAndUpdate({}, {
      contactUs: {
        city: {
          ar: req.body.city_ar,
          en: req.body.city_en,
        },
        country: {
          ar: req.body.country_ar,
          en: req.body.country_en,
        },
        address: {
          ar: req.body.address_ar,
          en: req.body.address_en,
        },
        email: {
          primary: req.body.primaryEmail,
          secondary: req.body.secondaryEmail,
        },
        phoneNumber: {
          primary: req.body.primaryPhoneNumber,
          secondary: req.body.secondaryPhoneNumber
        },
      }
    }, { upsert: true, new: true });
    
    res.status(200).json({ message: "contact Us Updated", success: true, data: data?.contactUs });
  } catch (err) {
    next(err);
  }
};

//get Contact Us
export const getContactUs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let data = await General.findOne({}, { contactUs: 1, _id: 0 });
    res.status(200).json({ message: "Get contact Us", success: true, data });
  } catch (err) {
    next(err);
  }
};

//Update who we are
export const updateWhoWeAre = async (req: GeneralRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed');
    error(req, res, next);
    
    let media: string[] = [];
    if ((req.files as any)?.media?.length) {
      (req.files as any).media.forEach((file: any) => {
        media.push(file.filename);
      });
    }
    
    if (req.body.oldMedia) {
      media.push(...req.body.oldMedia.split(','));
    }

    let data = await General.findOneAndUpdate({}, {
      whoAreWe: {
        media,
        title: {
          ar: req.body.title_ar,
          en: req.body.title_en,
        },
        description: {
          ar: req.body.description_ar,
          en: req.body.description_en,
        },
      }
    }, { upsert: true, new: true });
    
    res.status(200).json({ message: "who We Are Updated", success: true, data: data?.whoAreWe });
  } catch (err) {
    next(err);
  }
};

//get Who We Are
export const getWhoWeAre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let data = await General.findOne({}, { whoAreWe: 1, _id: 0 });
    res.status(200).json({ message: "Get who We Are", success: true, data });
  } catch (err) {
    next(err);
  }
};

//Update what Do We Apply
export const updateWhatDoWeApply = async (req: GeneralRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed');
    error(req, res, next);
    
    let data = await General.findOneAndUpdate({}, {
      whatDoWeApply: {
        title: {
          ar: req.body.title_ar,
          en: req.body.title_en,
        },
        description: {
          ar: req.body.description_ar,
          en: req.body.description_en,
        },
      }
    }, { upsert: true, new: true });
    
    res.status(200).json({ message: "What Do We Apply Updated", success: true, data: data?.whatDoWeApply });
  } catch (err) {
    next(err);
  }
};

//get What Do We Apply
export const getWhatDoWeApply = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let data = await General.findOne({}, { whatDoWeApply: 1, _id: 0 });
    res.status(200).json({ message: "Get What Do We Apply", success: true, data });
  } catch (err) {
    next(err);
  }
};

//Update Our Goals
export const updateOurGoals = async (req: GeneralRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed');
    error(req, res, next);
    
    let data = await General.findOneAndUpdate({}, {
      ourGoals: {
        image: (req.files as any)?.image ? (req.files as any).image[0]?.filename : req.body.image ? req.body.image : "",
        title: {
          ar: req.body.title_ar,
          en: req.body.title_en,
        },
        description1: {
          ar: req.body.description_ar1,
          en: req.body.description_en1,
        },
        description2: {
          ar: req.body.description_ar2,
          en: req.body.description_en2,
        }
      }
    }, { upsert: true, new: true });
    
    res.status(200).json({ message: "our Goals Updated", success: true, data: data?.ourGoals });
  } catch (err) {
    next(err);
  }
};

//get Our Goals
export const getOurGoals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let data = await General.findOne({}, { ourGoals: 1, _id: 0 });
    res.status(200).json({ message: "get Our Goals", success: true, data });
  } catch (err) {
    next(err);
  }
};

//Update our Commitments
export const updateOurCommitments = async (req: GeneralRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.isAdmin) throw new Error('Not Allowed');
    error(req, res, next);
    
    let data = await General.findOneAndUpdate({}, {
      ourCommitments: {
        image: (req.files as any)?.image ? (req.files as any).image[0]?.filename : req.body.image ? req.body.image : "",
        title: {
          ar: req.body.title_ar,
          en: req.body.title_en,
        },
        description1: {
          ar: req.body.description_ar1,
          en: req.body.description_en1,
        },
        description2: {
          ar: req.body.description_ar2,
          en: req.body.description_en2,
        }
      }
    }, { upsert: true, new: true });
    
    res.status(200).json({ message: "Our Commitments Updated", success: true, data: data?.ourCommitments });
  } catch (err) {
    next(err);
  }
};

//get Our Goals
export const getOurCommitments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let data = await General.findOne({}, { ourCommitments: 1, _id: 0 });
    res.status(200).json({ message: "get Our Commitments", success: true, data });
  } catch (err) {
    next(err);
  }
};

