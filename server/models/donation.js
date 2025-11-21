const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow anonymous donations
  },
  clerkUserId: {
    type: String,
    index: true
  },
  amount: {
    type: Number,
    required: [true, 'Donation amount is required'],
    min: [50, 'Minimum donation is KSh 50']
  },
  currency: {
    type: String,
    default: 'KES'
  },
  email: {
    type: String,
    required: [true, 'Email is required for donation receipt']
  },
  donorName: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  paymentMethod: {
    type: String,
    enum: ['PAYSTACK'],
    default: 'PAYSTACK'
  },
  paystackReference: {
    type: String,
    unique: true,
    sparse: true,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED'],
    default: 'PENDING'
  },
  transactionId: {
    type: String
  }
}, {
  timestamps: true
});

// Index for efficient queries
donationSchema.index({ paystackReference: 1 });
donationSchema.index({ paymentStatus: 1 });
donationSchema.index({ clerkUserId: 1 });
donationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Donation', donationSchema);