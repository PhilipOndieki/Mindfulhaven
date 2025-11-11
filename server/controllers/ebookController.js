const Ebook = require('../models/ebook');
const Purchase = require('../models/purchase');
const Subscription = require('../models/subscription');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all ebooks
// @route   GET /api/ebooks
// @access  Public
const getEbooks = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    search = '',
    category = '',
    sort = '-createdAt',
    isPremiumOnly
  } = req.query;

  const query = { isActive: true };

  // Search filter
  if (search) {
    query.$text = { $search: search };
  }

  // Category filter
  if (category) {
    query.category = category;
  }

  // Premium filter
  if (isPremiumOnly !== undefined) {
    query.isPremiumOnly = isPremiumOnly === 'true';
  }

  const skip = (page - 1) * limit;

  const [ebooks, total] = await Promise.all([
    Ebook.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit)),
    Ebook.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: ebooks,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single ebook
// @route   GET /api/ebooks/:id
// @access  Public
const getEbook = asyncHandler(async (req, res) => {
  const ebook = await Ebook.findById(req.params.id);

  if (!ebook) {
    return res.status(404).json({
      success: false,
      message: 'E-book not found'
    });
  }

  res.json({
    success: true,
    data: ebook
  });
});

// @desc    Create ebook
// @route   POST /api/ebooks
// @access  Private/Admin
const createEbook = asyncHandler(async (req, res) => {
  const ebook = await Ebook.create(req.body);

  res.status(201).json({
    success: true,
    data: ebook
  });
});

// @desc    Update ebook
// @route   PUT /api/ebooks/:id
// @access  Private/Admin
const updateEbook = asyncHandler(async (req, res) => {
  const ebook = await Ebook.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!ebook) {
    return res.status(404).json({
      success: false,
      message: 'E-book not found'
    });
  }

  res.json({
    success: true,
    data: ebook
  });
});

// @desc    Delete ebook
// @route   DELETE /api/ebooks/:id
// @access  Private/Admin
const deleteEbook = asyncHandler(async (req, res) => {
  const ebook = await Ebook.findById(req.params.id);

  if (!ebook) {
    return res.status(404).json({
      success: false,
      message: 'E-book not found'
    });
  }

  // Soft delete by marking as inactive
  ebook.isActive = false;
  await ebook.save();

  res.json({
    success: true,
    message: 'E-book deleted successfully'
  });
});

// @desc    Check if user owns ebook
// @route   GET /api/ebooks/:id/ownership/:clerkUserId
// @access  Public
const checkOwnership = asyncHandler(async (req, res) => {
  const { id, clerkUserId } = req.params;

  const purchase = await Purchase.findOne({
    ebook: id,
    clerkUserId,
    paymentStatus: 'SUCCESS'
  });

  res.json({
    success: true,
    data: {
      owned: !!purchase,
      purchase: purchase || null
    }
  });
});

// @desc    Get user's purchased ebooks
// @route   GET /api/ebooks/my-purchases/:clerkUserId
// @access  Public
const getUserPurchases = asyncHandler(async (req, res) => {
  const { clerkUserId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const [purchases, total] = await Promise.all([
    Purchase.find({
      clerkUserId,
      paymentStatus: 'SUCCESS'
    })
      .populate('ebook')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit)),
    Purchase.countDocuments({
      clerkUserId,
      paymentStatus: 'SUCCESS'
    })
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

// @desc    Get ebook categories
// @route   GET /api/ebooks/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Ebook.distinct('category', { isActive: true });

  res.json({
    success: true,
    data: categories
  });
});

module.exports = {
  getEbooks,
  getEbook,
  createEbook,
  updateEbook,
  deleteEbook,
  checkOwnership,
  getUserPurchases,
  getCategories
};
