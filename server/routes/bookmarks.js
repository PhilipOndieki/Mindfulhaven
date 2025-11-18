const express = require('express');
const router = express.Router();
const {
  toggleBookmark,
  getUserBookmarks,
  checkBookmark,
  removeBookmark
} = require('../controllers/bookmarkController');

router.post('/:postId', toggleBookmark);
router.get('/:clerkUserId', getUserBookmarks);
router.get('/:postId/check/:clerkUserId', checkBookmark);
router.delete('/:bookmarkId', removeBookmark);

module.exports = router;
