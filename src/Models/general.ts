import mongoose, { Document, Schema } from 'mongoose';

export interface IHeader {
  logo?: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  question: {
    en: string;
    ar: string;
  };
  media: string[];
}

export interface ISocialMedia {
  snapChat?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  facebook?: string;
  twitter?: string;
}

export interface IContactUs {
  city: {
    ar: string;
    en: string;
  };
  country: {
    ar: string;
    en: string;
  };
  address: {
    ar: string;
    en: string;
  };
  email: {
    primary: string;
    secondary?: string;
  };
  phoneNumber: {
    primary: number;
    secondary?: number;
  };
}

export interface IWhoAreWe {
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  media: string[];
}

export interface IWhatDoWeApply {
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
}

export interface IOurGoals {
  image?: string;
  title: {
    ar: string;
    en: string;
  };
  description1: {
    ar: string;
    en: string;
  };
  description2: {
    ar: string;
    en: string;
  };
}

export interface IOurCommitments {
  image?: string;
  title: {
    ar: string;
    en: string;
  };
  description1: {
    ar: string;
    en: string;
  };
  description2: {
    ar: string;
    en: string;
  };
}

export interface IGeneral extends Document {
  header: IHeader;
  socialMedia: ISocialMedia;
  contactUs: IContactUs;
  whoAreWe: IWhoAreWe;
  whatDoWeApply: IWhatDoWeApply;
  ourGoals: IOurGoals;
  ourCommitments: IOurCommitments;
  createdAt: Date;
  updatedAt: Date;
}

const generalSchema: Schema<IGeneral> = new Schema({
  header: {
    logo: String,
    title: {
      ar: String,
      en: String,
    },
    description: {
      ar: String,
      en: String,
    },
    question: {
      en: String,
      ar: String,
    },
    media: [String]
  },
  socialMedia: {
    snapChat: String,
    instagram: String,
    tiktok: String,
    youtube: String,
    facebook: String,
    twitter: String,
  },
  contactUs: {
    city: {
      ar: String,
      en: String,
    },
    country: {
      ar: String,
      en: String,
    },
    address: {
      ar: String,
      en: String,
    },
    email: {
      primary: String,
      secondary: String,
    },
    phoneNumber: {
      primary: Number,
      secondary: Number,
    }
  },
  whoAreWe: {
    title: {
      ar: String,
      en: String,
    },
    description: {
      ar: String,
      en: String,
    },
    media: [String]
  },
  whatDoWeApply: {
    title: {
      ar: String,
      en: String,
    },
    description: {
      ar: String,
      en: String,
    },
  },
  ourGoals: {
    image: String,
    title: {
      ar: String,
      en: String,
    },
    description1: {
      ar: String,
      en: String,
    },
    description2: {
      ar: String,
      en: String,
    },
  },
  ourCommitments: {
    image: String,
    title: {
      ar: String,
      en: String,
    },
    description1: {
      ar: String,
      en: String,
    },
    description2: {
      ar: String,
      en: String,
    },
  }
}, { timestamps: true });

export default mongoose.model<IGeneral>('general', generalSchema);

