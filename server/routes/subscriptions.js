const express = require('express');
const router = express.Router();
const {
  getSubscription,
  initializeSubscription,
  verifySubscription,
  cancelSubscription,
  useCredits
} = require('../controllers/subscriptionController');

router.get('/:clerkUserId', getSubscription);
router.post('/initialize', initializeSubscription);
router.post('/verify', verifySubscription);
router.post('/cancel', cancelSubscription);
router.post('/use-credits', useCredits);

module.exports = router;
