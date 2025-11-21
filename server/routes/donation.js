const express = require('express');
const router = express.Router();
const {
  initializeDonation,
  verifyDonation,
  getDonationStats,
  getDonationFeed
} = require('../controllers/donationController');

// Public routes
router.post('/initialize', initializeDonation);
router.post('/verify', verifyDonation);
router.get('/feed', getDonationFeed);

// Admin routes (add admin middleware in production)
router.get('/stats', getDonationStats);

module.exports = router;