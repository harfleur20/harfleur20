import mongoose, { Document, Schema } from 'mongoose';

export interface IQuote extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  requirements?: string[];
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  notes?: string;
}

const quoteSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  projectType: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  timeline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'approved', 'rejected'],
    default: 'pending'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

export const Quote = mongoose.model<IQuote>('Quote', quoteSchema);
