const Post = require('../models/post');
const User = require('../models/user');
const Ebook = require('../models/ebook');
const Purchase = require('../models/purchase');
const Subscription = require('../models/subscription');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalPosts,
    totalEbooks,
    totalPurchases,
    pendingPosts,
    premiumUsers,
    totalRevenue
  ] = await Promise.all([
    User.countDocuments(),
    Post.countDocuments(),
    Ebook.countDocuments({ isActive: true }),
    Purchase.countDocuments({ paymentStatus: 'SUCCESS' }),
    Post.countDocuments({ approvalStatus: 'PENDING' }),
    Subscription.countDocuments({ tier: { $in: ['PREMIUM', 'LIFETIME'] }, status: 'ACTIVE' }),
    Purchase.aggregate([
      { $match: { paymentStatus: 'SUCCESS', purchaseType: 'CASH' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])
  ]);

  res.json({
    success: true,
    data: {
      totalUsers,
      totalPosts,
      totalEbooks,
      totalPurchases,
      pendingPosts,
      premiumUsers,
      totalRevenue: totalRevenue[0]?.total || 0
    }
  });
});

// @desc    Get all posts for approval
// @route   GET /api/admin/posts
// @access  Private/Admin
const getAllPosts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    status = 'PENDING',
    search = ''
  } = req.query;

  const query = {};

  if (status && status !== 'ALL') {
    query.approvalStatus = status;
  }

  if (search) {
    query.$text = { $search: search };
  }

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find(query)
      .populate('author', 'username email clerkUserId')
      .populate('category', 'name')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit)),
    Post.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: posts,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Approve or reject a post
// @route   PUT /api/admin/posts/:id/approve
// @access  Private/Admin
const updatePostApproval = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { approvalStatus, rejectionReason } = req.body;

  if (!['APPROVED', 'REJECTED'].includes(approvalStatus)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid approval status'
    });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  post.approvalStatus = approvalStatus;

  if (approvalStatus === 'REJECTED' && rejectionReason) {
    post.rejectionReason = rejectionReason;
  } else {
    post.rejectionReason = undefined;
  }

  await post.save();

  await post.populate('author', 'username email');

  res.json({
    success: true,
    data: post,
    message: `Post ${approvalStatus.toLowerCase()} successfully`
  });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    role = '',
    search = ''
  } = req.query;

  const query = {};

  if (role) {
    query.role = role;
  }

  if (search) {
    query.$or = [
      { username: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(query)
      .populate('subscription')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit)),
    User.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: users,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['USER', 'ADMIN'].includes(role)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid role'
    });
  }

  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  ).populate('subscription');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: user,
    message: `User role updated to ${role}`
  });
});

// @desc    Get all e-books for admin
// @route   GET /api/admin/ebooks
// @access  Private/Admin
const getAllEbooks = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    search = '',
    isActive = ''
  } = req.query;

  const query = {};

  if (search) {
    query.$text = { $search: search };
  }

  if (isActive !== '') {
    query.isActive = isActive === 'true';
  }

  const skip = (page - 1) * limit;

  const [ebooks, total] = await Promise.all([
    Ebook.find(query)
      .sort('-createdAt')
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

// @desc    Get all purchases
// @route   GET /api/admin/purchases
// @access  Private/Admin
const getAllPurchases = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    status = ''
  } = req.query;

  const query = {};

  if (status) {
    query.paymentStatus = status;
  }

  const skip = (page - 1) * limit;

  const [purchases, total] = await Promise.all([
    Purchase.find(query)
      .populate('user', 'username email')
      .populate('ebook', 'title author price')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit)),
    Purchase.countDocuments(query)
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

// @desc    Get all subscriptions
// @route   GET /api/admin/subscriptions
// @access  Private/Admin
const getAllSubscriptions = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    tier = '',
    status = ''
  } = req.query;

  const query = {};

  if (tier) {
    query.tier = tier;
  }

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const [subscriptions, total] = await Promise.all([
    Subscription.find(query)
      .populate('user', 'username email')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit)),
    Subscription.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: subscriptions,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

module.exports = {
  getDashboardStats,
  getAllPosts,
  updatePostApproval,
  getAllUsers,
  updateUserRole,
  getAllEbooks,
  getAllPurchases,
  getAllSubscriptions
};
