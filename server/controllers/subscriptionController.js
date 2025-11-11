const Subscription = require('../models/subscription');
const User = require('../models/user');
const paystackService = require('../services/paystack');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get user subscription
// @route   GET /api/subscriptions/:clerkUserId
// @access  Private
const getSubscription = asyncHandler(async (req, res) => {
  const { clerkUserId } = req.params;

  let subscription = await Subscription.findOne({ clerkUserId });

  // Create free subscription if none exists
  if (!subscription) {
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    subscription = await Subscription.create({
      user: user._id,
      clerkUserId,
      tier: 'FREE',
      status: 'ACTIVE',
      credits: 0
    });

    // Link subscription to user
    user.subscription = subscription._id;
    await user.save();
  }

  res.json({
    success: true,
    data: subscription
  });
});

// @desc    Initialize subscription payment
// @route   POST /api/subscriptions/initialize
// @access  Private
const initializeSubscription = asyncHandler(async (req, res) => {
  const { clerkUserId, email, tier } = req.body;

  // Find user
  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Validate tier
  if (!['PREMIUM', 'LIFETIME'].includes(tier)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid subscription tier'
    });
  }

  // Find or create subscription
  let subscription = await Subscription.findOne({ clerkUserId });
  if (!subscription) {
    subscription = await Subscription.create({
      user: user._id,
      clerkUserId,
      tier: 'FREE',
      status: 'ACTIVE'
    });

    user.subscription = subscription._id;
    await user.save();
  }

  // Set pricing
  const pricing = {
    PREMIUM: 1200, // KES 1,200 per month
    LIFETIME: 29900 // KES 29,900 one-time
  };

  const amount = pricing[tier];
  const reference = paystackService.generateReference('sub');
  const callbackUrl = `${process.env.FRONTEND_URL}/payment/verify`;

  // Initialize Paystack payment
  const paymentData = await paystackService.initializePayment({
    email,
    amount,
    reference,
    callback_url: callbackUrl,
    currency: 'KES',
    metadata: {
      clerkUserId,
      userId: user._id.toString(),
      tier,
      purchaseType: 'subscription'
    }
  });

  // Update subscription with payment reference
  subscription.paystackReference = reference;
  subscription.amount = amount;
  await subscription.save();

  res.json({
    success: true,
    data: {
      subscription,
      paymentUrl: paymentData.data.authorization_url,
      reference: paymentData.data.reference
    }
  });
});

// @desc    Verify subscription payment
// @route   POST /api/subscriptions/verify
// @access  Private
const verifySubscription = asyncHandler(async (req, res) => {
  const { reference } = req.body;

  // Verify payment with Paystack
  const verification = await paystackService.verifyPayment(reference);

  if (!verification.status || verification.data.status !== 'success') {
    return res.status(400).json({
      success: false,
      message: 'Payment verification failed'
    });
  }

  const metadata = verification.data.metadata;
  const tier = metadata.tier;

  // Find subscription
  const subscription = await Subscription.findOne({
    paystackReference: reference
  });

  if (!subscription) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found'
    });
  }

  // Upgrade subscription
  const duration = tier === 'PREMIUM' ? 30 : null; // 30 days for Premium
  await subscription.upgradeTier(tier, duration);

  res.json({
    success: true,
    data: {
      subscription,
      message: `Successfully upgraded to ${tier}`
    }
  });
});

// @desc    Cancel subscription
// @route   POST /api/subscriptions/cancel
// @access  Private
const cancelSubscription = asyncHandler(async (req, res) => {
  const { clerkUserId } = req.body;

  const subscription = await Subscription.findOne({ clerkUserId });

  if (!subscription) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found'
    });
  }

  if (subscription.tier === 'FREE') {
    return res.status(400).json({
      success: false,
      message: 'Cannot cancel free subscription'
    });
  }

  if (subscription.tier === 'LIFETIME') {
    return res.status(400).json({
      success: false,
      message: 'Cannot cancel lifetime subscription'
    });
  }

  // Cancel subscription
  subscription.status = 'CANCELLED';
  subscription.autoRenew = false;
  await subscription.save();

  res.json({
    success: true,
    data: {
      subscription,
      message: 'Subscription cancelled successfully'
    }
  });
});

// @desc    Use credits for ebook purchase
// @route   POST /api/subscriptions/use-credits
// @access  Private
const useCredits = asyncHandler(async (req, res) => {
  const { clerkUserId, amount } = req.body;

  const subscription = await Subscription.findOne({ clerkUserId });

  if (!subscription) {
    return res.status(404).json({
      success: false,
      message: 'Subscription not found'
    });
  }

  if (subscription.credits < amount) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient credits',
      current: subscription.credits,
      required: amount
    });
  }

  await subscription.deductCredits(amount);

  res.json({
    success: true,
    data: {
      subscription,
      message: 'Credits deducted successfully'
    }
  });
});

module.exports = {
  getSubscription,
  initializeSubscription,
  verifySubscription,
  cancelSubscription,
  useCredits
};
