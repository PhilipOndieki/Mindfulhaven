import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const LikeButton = ({ postId, initialLiked = false, initialCount = 0, onLikeChange }) => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLiked(initialLiked);
    setCount(initialCount);
  }, [initialLiked, initialCount]);

  const handleLike = async () => {
    if (!isSignedIn) {
      navigate('/sign-in');
      return;
    }

    try {
      setLoading(true);

      // Optimistic update
      const newLiked = !liked;
      const newCount = newLiked ? count + 1 : count - 1;
      setLiked(newLiked);
      setCount(newCount);

      // TODO: Make actual API call to toggle like
      // For now, we're just updating the UI optimistically

      if (onLikeChange) {
        onLikeChange(newLiked, newCount);
      }
    } catch (error) {
      // Revert on error
      setLiked(!liked);
      setCount(liked ? count - 1 : count + 1);
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        liked
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <svg
        className={`w-5 h-5 ${liked ? 'fill-current' : 'stroke-current'}`}
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span className="font-semibold">{count}</span>
    </button>
  );
};

export default LikeButton;
