import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  category: string;
  author: mongoose.Types.ObjectId;
  status: 'published' | 'draft';
  image: string;
  chapters: Array<{
    title: string;
    content: string;
    videoLink: string;
  }>;
}

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  image: { type: String },
  chapters: [{
    title: { type: String, required: true },
    content: { type: String },
    videoLink: { type: String },
  }],
}, { timestamps: true });

export default mongoose.model<ICourse>('Course', CourseSchema);