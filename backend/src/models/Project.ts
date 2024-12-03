import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  client: string;
  category: string;
  technologies: string[];
  thumbnail?: string;
  images: string[];
  featured: boolean;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  startDate: Date;
  endDate?: Date;
  testimonial?: {
    content: string;
    author: string;
    position: string;
  };
}

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    trim: true
  }],
  thumbnail: {
    type: String
  },
  images: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['planning', 'in_progress', 'completed', 'on_hold'],
    default: 'planning'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  testimonial: {
    content: String,
    author: String,
    position: String
  }
}, {
  timestamps: true
});

export const Project = mongoose.model<IProject>('Project', projectSchema);
