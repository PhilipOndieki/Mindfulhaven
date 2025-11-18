const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  tier: {
    type: String,
    enum: ['FREE', 'PREMIUM', 'LIFETIME'],
    default: 'FREE'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'EXPIRED', 'CANCELLED'],
    default: 'ACTIVE'
  },
  credits: {
    type: Number,
    default: 0,
    min: [0, 'Credits cannot be negative']
  },
  paystackReference: {
    type: String,
    sparse: true
  },
  amount: {
    type: Number
  },
  currency: {
    type: String,
    default: 'KES'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  autoRenew: {
    type: Boolean,
    default: false
  },
  paystackSubscriptionCode: {
    type: String, // For recurring subscriptions
    sparse: true
  }
}, {
  timestamps: true
});

// Virtual to check if subscription is active
subscriptionSchema.virtual('isActive').get(function() {
  if (this.tier === 'LIFETIME') return true;
  if (this.tier === 'FREE') return true;
  if (this.status !== 'ACTIVE') return false;
  if (!this.endDate) return false;
  return new Date() < this.endDate;
});

// Method to add credits
subscriptionSchema.methods.addCredits = function(amount) {
  this.credits += amount;
  return this.save();
};

// Method to deduct credits
subscriptionSchema.methods.deductCredits = function(amount) {
  if (this.credits < amount) {
    throw new Error('Insufficient credits');
  }
  this.credits -= amount;
  return this.save();
};

// Method to upgrade tier
subscriptionSchema.methods.upgradeTier = function(newTier, duration = null) {
  this.tier = newTier;
  this.status = 'ACTIVE';
  this.startDate = new Date();

  if (newTier === 'PREMIUM' && duration) {
    // Set end date based on duration (e.g., 30 days)
    this.endDate = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
  } else if (newTier === 'LIFETIME') {
    this.endDate = null; // Lifetime has no end date
  }

  // Add credits based on tier
  if (newTier === 'PREMIUM') {
    this.credits += 10; // 10 credits for Premium
  } else if (newTier === 'LIFETIME') {
    this.credits += 50; // 50 credits for Lifetime
  }

  return this.save();
};

subscriptionSchema.index({ clerkUserId: 1 });
subscriptionSchema.index({ tier: 1 });
subscriptionSchema.index({ status: 1 });

// Ensure virtuals are included in JSON
subscriptionSchema.set('toJSON', { virtuals: true });
subscriptionSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
