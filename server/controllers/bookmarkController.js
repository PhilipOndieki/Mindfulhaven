const Bookmark = require('../models/bookmark');
const User = require('../models/user');
const Post = require('../models/post');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Toggle bookmark
// @route   POST /api/bookmarks/:postId
// @access  Private
const toggleBookmark = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { clerkUserId } = req.body;

  // Find user
  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Check if post exists
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  // Check if bookmark exists
  const existingBookmark = await Bookmark.findOne({
    user: user._id,
    post: postId
  });

  if (existingBookmark) {
    // Remove bookmark
    await existingBookmark.deleteOne();
    return res.json({
      success: true,
      data: {
        bookmarked: false,
        message: 'Bookmark removed'
      }
    });
  }

  // Add bookmark
  const bookmark = await Bookmark.create({
    user: user._id,
    clerkUserId,
    post: postId
  });

  res.json({
    success: true,
    data: {
      bookmark,
      bookmarked: true,
      message: 'Bookmark added'
    }
  });
});

// @desc    Get user bookmarks
// @route   GET /api/bookmarks/:clerkUserId
// @access  Private
const getUserBookmarks = asyncHandler(async (req, res) => {
  const { clerkUserId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const [bookmarks, total] = await Promise.all([
    Bookmark.find({ clerkUserId })
      .populate({
        path: 'post',
        populate: {
          path: 'category',
          select: 'name slug'
        }
      })
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit)),
    Bookmark.countDocuments({ clerkUserId })
  ]);

  res.json({
    success: true,
    data: bookmarks,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Check if post is bookmarked
// @route   GET /api/bookmarks/:postId/check/:clerkUserId
// @access  Private
const checkBookmark = asyncHandler(async (req, res) => {
  const { postId, clerkUserId } = req.params;

  const bookmark = await Bookmark.findOne({
    clerkUserId,
    post: postId
  });

  res.json({
    success: true,
    data: {
      bookmarked: !!bookmark
    }
  });
});

// @desc    Remove bookmark
// @route   DELETE /api/bookmarks/:bookmarkId
// @access  Private
const removeBookmark = asyncHandler(async (req, res) => {
  const { bookmarkId } = req.params;
  const { clerkUserId } = req.query;

  const bookmark = await Bookmark.findById(bookmarkId);

  if (!bookmark) {
    return res.status(404).json({
      success: false,
      message: 'Bookmark not found'
    });
  }

  // Verify ownership
  if (bookmark.clerkUserId !== clerkUserId) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized'
    });
  }

  await bookmark.deleteOne();

  res.json({
    success: true,
    message: 'Bookmark removed successfully'
  });
});

module.exports = {
  toggleBookmark,
  getUserBookmarks,
  checkBookmark,
  removeBookmark
};
