const Donation = require('../models/donation');
const User = require('../models/user');
const paystackService = require('../services/paystack');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Initialize donation payment
// @route   POST /api/donations/initialize
// @access  Public (allows anonymous donations)
const initializeDonation = asyncHandler(async (req, res) => {
  const { 
    amount, 
    email, 
    donorName, 
    message, 
    isAnonymous, 
    clerkUserId 
  } = req.body;

  // Validate amount
  if (!amount || amount < 50) {
    return res.status(400).json({
      success: false,
      message: 'Minimum donation amount is KSh 50'
    });
  }

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required for donation receipt'
    });
  }

  // Find user if clerkUserId is provided
  let user = null;
  if (clerkUserId) {
    user = await User.findOne({ clerkUserId });
  }

  // Generate unique reference
  const reference = paystackService.generateReference('donation');
  const callbackUrl = `${process.env.FRONTEND_URL}/payment/verify`;

  // Initialize Paystack payment
  const paymentData = await paystackService.initializePayment({
    email,
    amount,
    reference,
    callback_url: callbackUrl,
    currency: 'KES',
    metadata: {
      donorName: isAnonymous ? 'Anonymous' : donorName,
      message: message || '',
      isAnonymous,
      clerkUserId: clerkUserId || null,
      userId: user ? user._id.toString() : null,
      purchaseType: 'donation'
    }
  });

  // Create donation record
  const donation = await Donation.create({
    user: user ? user._id : null,
    clerkUserId: clerkUserId || null,
    amount,
    email,
    donorName: isAnonymous ? 'Anonymous' : donorName,
    message: message || '',
    isAnonymous,
    paystackReference: reference,
    paymentStatus: 'PENDING'
  });

  res.json({
    success: true,
    data: {
      donation,
      paymentUrl: paymentData.data.authorization_url,
      reference: paymentData.data.reference
    }
  });
});

// @desc    Verify donation payment
// @route   POST /api/donations/verify
// @access  Public
const verifyDonation = asyncHandler(async (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({
      success: false,
      message: 'Payment reference is required'
    });
  }

  // Verify payment with Paystack
  const verification = await paystackService.verifyPayment(reference);

  if (!verification.status || verification.data.status !== 'success') {
    return res.status(400).json({
      success: false,
      message: 'Payment verification failed'
    });
  }

  // Find donation record
  const donation = await Donation.findOne({ paystackReference: reference });
  if (!donation) {
    return res.status(404).json({
      success: false,
      message: 'Donation record not found'
    });
  }

  // Update donation status
  donation.paymentStatus = 'SUCCESS';
  donation.transactionId = verification.data.id;
  await donation.save();

  res.json({
    success: true,
    data: {
      donation,
      message: 'Thank you for your donation! Your support keeps Mindful Haven free for students.'
    }
  });
});

// @desc    Get donation statistics (for admin)
// @route   GET /api/donations/stats
// @access  Private/Admin
const getDonationStats = asyncHandler(async (req, res) => {
  const [totalDonations, totalAmount, recentDonations] = await Promise.all([
    Donation.countDocuments({ paymentStatus: 'SUCCESS' }),
    Donation.aggregate([
      { $match: { paymentStatus: 'SUCCESS' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]),
    Donation.find({ paymentStatus: 'SUCCESS' })
      .sort('-createdAt')
      .limit(10)
      .select('amount donorName message isAnonymous createdAt')
  ]);

  res.json({
    success: true,
    data: {
      totalDonations,
      totalAmount: totalAmount[0]?.total || 0,
      recentDonations: recentDonations.map(d => ({
        amount: d.amount,
        donorName: d.isAnonymous ? 'Anonymous' : d.donorName,
        message: d.message,
        date: d.createdAt
      }))
    }
  });
});

// @desc    Get public donation feed (recent donors)
// @route   GET /api/donations/feed
// @access  Public
const getDonationFeed = asyncHandler(async (req, res) => {
  const { limit = 20 } = req.query;

  const donations = await Donation.find({ 
    paymentStatus: 'SUCCESS' 
  })
    .sort('-createdAt')
    .limit(parseInt(limit))
    .select('amount donorName message isAnonymous createdAt');

  const feed = donations.map(d => ({
    amount: d.amount,
    donorName: d.isAnonymous ? 'Anonymous' : d.donorName || 'Anonymous',
    message: d.message,
    date: d.createdAt
  }));

  res.json({
    success: true,
    data: feed
  });
});

module.exports = {
  initializeDonation,
  verifyDonation,
  getDonationStats,
  getDonationFeed
};