const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clerkUserId: {
    type: String,
    required: true,
    index: true
  },
  ebook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ebook',
    required: true
  },
  purchaseType: {
    type: String,
    enum: ['CASH', 'CREDITS'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'KES' // Kenyan Shillings for Paystack
  },
  paymentMethod: {
    type: String,
    enum: ['PAYSTACK', 'CREDITS'],
    required: true
  },
  paystackReference: {
    type: String,
    unique: true,
    sparse: true // Allows null values but enforces uniqueness when present
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'],
    default: 'PENDING'
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  lastDownloadedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate purchases
purchaseSchema.index({ user: 1, ebook: 1 });
purchaseSchema.index({ clerkUserId: 1, ebook: 1 });
purchaseSchema.index({ paystackReference: 1 }, { sparse: true });
purchaseSchema.index({ paymentStatus: 1 });

module.exports = mongoose.model('Purchase', purchaseSchema);
