const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  clerkUserId: {
    type: String,
    required: true,
    index: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
}, {
  timestamps: true
});

// Compound unique index to prevent duplicate bookmarks
bookmarkSchema.index({ user: 1, post: 1 }, { unique: true });
bookmarkSchema.index({ clerkUserId: 1, post: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
