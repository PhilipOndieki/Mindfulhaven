const express = require('express');
const router = express.Router();
const {
  getEbooks,
  getEbook,
  createEbook,
  updateEbook,
  deleteEbook,
  checkOwnership,
  getUserPurchases,
  getCategories
} = require('../controllers/ebookController');

// Public routes
router.get('/', getEbooks);
router.get('/categories', getCategories);
router.get('/:id', getEbook);
router.get('/:id/ownership/:clerkUserId', checkOwnership);
router.get('/my-purchases/:clerkUserId', getUserPurchases);

// Admin routes (add admin middleware in production)
router.post('/', createEbook);
router.put('/:id', updateEbook);
router.delete('/:id', deleteEbook);

module.exports = router;
