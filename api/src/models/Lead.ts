import mongoose, { Schema, Document } from 'mongoose';

export type LeadType = 'volunteer' | 'contact' | 'support';
export type LeadStatus = 'new' | 'contacted' | 'follow-up' | 'resolved' | 'closed';

export interface ILead extends Document {
  name: string;
  email?: string;
  phone: string;
  city?: string;
  type: LeadType;
  interest?: string;
  message?: string;
  status: LeadStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [25, 'Phone number cannot exceed 25 characters'],
    },
    city: {
      type: String,
      trim: true,
      maxlength: [100, 'City cannot exceed 100 characters'],
      default: '',
    },
    type: {
      type: String,
      required: [true, 'Lead type is required'],
      enum: {
        values: ['volunteer', 'contact', 'support'],
        message: '{VALUE} is not a supported lead type',
      },
      index: true,
    },
    interest: {
      type: String,
      trim: true,
      maxlength: [200, 'Interest cannot exceed 200 characters'],
      default: '',
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
      default: '',
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['new', 'contacted', 'follow-up', 'resolved', 'closed'],
        message: '{VALUE} is not a valid lead status',
      },
      default: 'new',
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [5000, 'Notes cannot exceed 5000 characters'],
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Compound indexes for searching and sorting performance
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ type: 1, status: 1 });
LeadSchema.index({ name: 'text', phone: 'text', email: 'text', city: 'text' });

export const Lead = mongoose.model<ILead>('Lead', LeadSchema);
