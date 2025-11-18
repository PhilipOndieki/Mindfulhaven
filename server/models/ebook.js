const mongoose = require('mongoose');

const ebookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'E-book title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'E-book description is required']
  },
  author: {
    type: String,
    required: [true, 'E-book author is required']
  },
  coverImage: {
    type: String,
    required: [true, 'E-book cover image is required']
  },
  price: {
    type: Number,
    required: [true, 'E-book price is required'],
    min: [0, 'Price cannot be negative']
  },
  credits: {
    type: Number,
    required: [true, 'E-book credit cost is required'],
    min: [0, 'Credits cannot be negative'],
    default: 0
  },
  fileUrl: {
    type: String,
    required: [true, 'E-book file URL is required']
  },
  fileSize: {
    type: Number, // in bytes
    required: true
  },
  format: {
    type: String,
    enum: ['PDF', 'EPUB', 'MOBI'],
    default: 'PDF'
  },
  pages: {
    type: Number,
    min: [1, 'Pages must be at least 1']
  },
  category: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  previewUrl: {
    type: String // URL to preview/sample pages
  },
  isPremiumOnly: {
    type: Boolean,
    default: false // If true, only Premium+ users can purchase
  },
  isActive: {
    type: Boolean,
    default: true
  },
  downloads: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for searching
ebookSchema.index({ title: 'text', description: 'text', author: 'text' });
ebookSchema.index({ category: 1 });
ebookSchema.index({ isActive: 1 });

module.exports = mongoose.model('Ebook', ebookSchema);
