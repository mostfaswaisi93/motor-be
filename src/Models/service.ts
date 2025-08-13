import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IQuestion {
  question: {
    ar: string;
    en: string;
  };
  answer: {
    ar: string;
    en: string;
  };
}

export interface IService extends Document {
  logo?: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  whatsappLink?: string;
  media: string[];
  questions: IQuestion[];
  management: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>({
  question: {
    ar: String,
    en: String,
  },
  answer: {
    ar: String,
    en: String,
  }
});

const serviceSchema: Schema<IService> = new Schema({
  logo: String,
  title: {
    ar: String,
    en: String,
  },
  description: {
    ar: String,
    en: String,
  },
  whatsappLink: String,
  media: [String],
  questions: [questionSchema],
  management: [{ type: Schema.Types.ObjectId, ref: "management" }]
}, { timestamps: true });

export default mongoose.model<IService>('service', serviceSchema);

