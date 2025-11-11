const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const {
  getDashboardStats,
  getAllPosts,
  updatePostApproval,
  getAllUsers,
  updateUserRole,
  getAllEbooks,
  getAllPurchases,
  getAllSubscriptions
} = require('../controllers/adminController');

// All routes require admin authentication
// Note: In production, you might want to add Clerk middleware here as well

// Dashboard stats
router.get('/stats', getDashboardStats);

// Post management
router.get('/posts', getAllPosts);
router.put('/posts/:id/approve', updatePostApproval);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);

// E-book management
router.get('/ebooks', getAllEbooks);

// Purchase management
router.get('/purchases', getAllPurchases);

// Subscription management
router.get('/subscriptions', getAllSubscriptions);

module.exports = router;
