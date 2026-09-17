import mongoose from 'mongoose';
import dbConnect from '../lib/db';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  youtubeLink: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(v);
      },
      message: props => `${props.value} is not a valid YouTube URL!`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create slug from title before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')      // Replace spaces with -
      .replace(/--+/g, '-');     // Replace multiple - with single -
  }
  next();
});

// Update the updatedAt field before saving
blogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create model if it doesn't exist
export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
