import mongoose, { Document, Schema, Types } from 'mongoose';

export type ManagementType = 'General' | 'Service';

export interface IManagement extends Document {
  type: ManagementType;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  phoneNumber: number;
  email?: string;
  image?: string;
  serviceId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const managementSchema: Schema<IManagement> = new Schema({
  type: { type: String, enum: ['General', 'Service'] },
  title: {
    ar: String,
    en: String,
  },
  description: {
    ar: String,
    en: String,
  },
  phoneNumber: Number,
  email: String,
  image: String,
  serviceId: { type: Schema.Types.ObjectId, ref: 'service' }
}, { timestamps: true });

export default mongoose.model<IManagement>('management', managementSchema);

