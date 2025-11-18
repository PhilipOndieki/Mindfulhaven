const Purchase = require('../models/purchase');
const Ebook = require('../models/ebook');
const Subscription = require('../models/subscription');
const User = require('../models/user');
const paystackService = require('../services/paystack');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Initialize ebook purchase
// @route   POST /api/purchases/initialize
// @access  Private
const initializePurchase = asyncHandler(async (req, res) => {
  const { ebookId, clerkUserId, email, purchaseType } = req.body;

  // Find the ebook
  const ebook = await Ebook.findById(ebookId);
  if (!ebook || !ebook.isActive) {
    return res.status(404).json({
      success: false,
      message: 'E-book not found'
    });
  }

  // Find user
  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Check if already purchased
  const existingPurchase = await Purchase.findOne({
    user: user._id,
    ebook: ebookId,
    paymentStatus: 'SUCCESS'
  });

  if (existingPurchase) {
    return res.status(400).json({
      success: false,
      message: 'You already own this e-book'
    });
  }

  // Handle credit purchase
  if (purchaseType === 'CREDITS') {
    const subscription = await Subscription.findOne({ clerkUserId });

    if (!subscription || subscription.credits < ebook.credits) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient credits'
      });
    }

    // Deduct credits
    await subscription.deductCredits(ebook.credits);

    // Create purchase record
    const purchase = await Purchase.create({
      user: user._id,
      clerkUserId,
      ebook: ebookId,
      purchaseType: 'CREDITS',
      amount: ebook.credits,
      paymentMethod: 'CREDITS',
      paymentStatus: 'SUCCESS'
    });

    // Increment download count
    ebook.downloads += 1;
    await ebook.save();

    return res.json({
      success: true,
      data: {
        purchase,
        message: 'E-book purchased successfully with credits'
      }
    });
  }

  // Handle cash purchase with Paystack
  const reference = paystackService.generateReference('ebook');
  const callbackUrl = `${process.env.FRONTEND_URL}/payment/verify`;

  // Initialize Paystack payment
  const paymentData = await paystackService.initializePayment({
    email,
    amount: ebook.price,
    reference,
    callback_url: callbackUrl,
    currency: 'KES',
    metadata: {
      ebookId: ebook._id.toString(),
      clerkUserId,
      userId: user._id.toString(),
      purchaseType: 'ebook'
    }
  });

  // Create pending purchase record
  const purchase = await Purchase.create({
    user: user._id,
    clerkUserId,
    ebook: ebookId,
    purchaseType: 'CASH',
    amount: ebook.price,
    paymentMethod: 'PAYSTACK',
    paystackReference: reference,
    paymentStatus: 'PENDING'
  });

  res.json({
    success: true,
    data: {
      purchase,
      paymentUrl: paymentData.data.authorization_url,
      reference: paymentData.data.reference
    }
  });
});

// @desc    Verify ebook purchase
// @route   POST /api/purchases/verify
// @access  Private
const verifyPurchase = asyncHandler(async (req, res) => {
  const { reference } = req.body;

  // Verify payment with Paystack
  const verification = await paystackService.verifyPayment(reference);

  if (!verification.status || verification.data.status !== 'success') {
    return res.status(400).json({
      success: false,
      message: 'Payment verification failed'
    });
  }

  // Find purchase record
  const purchase = await Purchase.findOne({ paystackReference: reference });
  if (!purchase) {
    return res.status(404).json({
      success: false,
      message: 'Purchase record not found'
    });
  }

  // Update purchase status
  purchase.paymentStatus = 'SUCCESS';
  await purchase.save();

  // Increment ebook downloads
  const ebook = await Ebook.findById(purchase.ebook);
  if (ebook) {
    ebook.downloads += 1;
    await ebook.save();
  }

  // Populate purchase with ebook data
  await purchase.populate('ebook');

  res.json({
    success: true,
    data: {
      purchase,
      message: 'Payment verified successfully'
    }
  });
});

// @desc    Download ebook
// @route   GET /api/purchases/:purchaseId/download
// @access  Private
const downloadEbook = asyncHandler(async (req, res) => {
  const { purchaseId } = req.params;
  const { clerkUserId } = req.query;

  const purchase = await Purchase.findById(purchaseId).populate('ebook');

  if (!purchase) {
    return res.status(404).json({
      success: false,
      message: 'Purchase not found'
    });
  }

  // Verify ownership
  if (purchase.clerkUserId !== clerkUserId) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized access'
    });
  }

  // Verify payment status
  if (purchase.paymentStatus !== 'SUCCESS') {
    return res.status(400).json({
      success: false,
      message: 'Payment not completed'
    });
  }

  // Update download count
  purchase.downloadCount += 1;
  purchase.lastDownloadedAt = new Date();
  await purchase.save();

  // Return download URL (in production, you might generate a signed URL)
  res.json({
    success: true,
    data: {
      downloadUrl: purchase.ebook.fileUrl,
      ebook: purchase.ebook
    }
  });
});

// @desc    Get user purchase history
// @route   GET /api/purchases/history/:clerkUserId
// @access  Private
const getPurchaseHistory = asyncHandler(async (req, res) => {
  const { clerkUserId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const [purchases, total] = await Promise.all([
    Purchase.find({ clerkUserId })
      .populate('ebook')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit)),
    Purchase.countDocuments({ clerkUserId })
  ]);

  res.json({
    success: true,
    data: purchases,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

module.exports = {
  initializePurchase,
  verifyPurchase,
  downloadEbook,
  getPurchaseHistory
};
