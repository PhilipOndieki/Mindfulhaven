const express = require('express');
const router = express.Router();
const {
  initializePurchase,
  verifyPurchase,
  downloadEbook,
  getPurchaseHistory
} = require('../controllers/purchaseController');

router.post('/initialize', initializePurchase);
router.post('/verify', verifyPurchase);
router.get('/:purchaseId/download', downloadEbook);
router.get('/history/:clerkUserId', getPurchaseHistory);

module.exports = router;
