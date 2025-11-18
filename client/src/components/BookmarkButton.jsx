import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toggleBookmark, checkBookmark } from '../services/api';

const BookmarkButton = ({ postId, compact = false }) => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      checkBookmarkStatus();
    }
  }, [postId, isSignedIn, user]);

  const checkBookmarkStatus = async () => {
    try {
      const response = await checkBookmark(postId, user.id);
      setBookmarked(response.data.data.bookmarked);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };

  const handleToggleBookmark = async (e) => {
    e.preventDefault(); // Prevent navigation if button is inside a link

    if (!isSignedIn) {
      navigate('/sign-in');
      return;
    }

    try {
      setLoading(true);

      const response = await toggleBookmark(postId, user.id);
      setBookmarked(response.data.data.bookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      alert('Failed to update bookmark. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleToggleBookmark}
        disabled={loading}
        className={`p-2 rounded-full transition-all ${
          bookmarked
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        <svg
          className="w-5 h-5"
          fill={bookmarked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleBookmark}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        bookmarked
          ? 'bg-primary text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <svg
        className="w-5 h-5"
        fill={bookmarked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
      <span className="font-semibold">
        {bookmarked ? 'Bookmarked' : 'Bookmark'}
      </span>
    </button>
  );
};

export default BookmarkButton;
