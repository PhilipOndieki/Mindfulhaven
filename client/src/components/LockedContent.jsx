import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const LockedContent = ({ post, showPreview = true, subscription }) => {
  const { isSignedIn } = useUser();

  const isPremium = post.isPremium;
  const hasAccess = subscription && (subscription.tier === 'PREMIUM' || subscription.tier === 'LIFETIME');

  // If user has access or post is not premium, don't show lock
  if (!isPremium || hasAccess) {
    return null;
  }

  const previewText = showPreview && post.content
    ? post.content.substring(0, 200) + '...'
    : null;

  return (
    <div className="relative">
      {/* Preview Content */}
      {previewText && (
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">{previewText}</p>
        </div>
      )}

      {/* Lock Overlay */}
      <div className="bg-gradient-to-b from-transparent via-white to-white absolute inset-0 pointer-events-none" />

      {/* Lock Message */}
      <div className="relative bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 rounded-full p-4">
            <svg
              className="w-12 h-12 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Premium Content
        </h3>
        <p className="text-gray-700 mb-4">
          This content is exclusive to Premium and Lifetime members.
        </p>

        {!isSignedIn ? (
          <div className="space-y-2">
            <Link
              to="/sign-in"
              className="inline-block w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition font-semibold"
            >
              Sign In to Continue
            </Link>
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-primary underline hover:no-underline">
                Sign up free
              </Link>
            </p>
          </div>
        ) : (
          <Link
            to="/pricing"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition font-semibold"
          >
            Upgrade to Premium
          </Link>
        )}

        {/* Features Preview */}
        <div className="mt-6 pt-6 border-t border-yellow-300">
          <p className="text-sm text-gray-600 mb-3">Premium benefits include:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              All premium posts
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              E-book credits
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ad-free experience
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockedContent;
