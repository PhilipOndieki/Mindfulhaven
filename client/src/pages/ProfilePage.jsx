import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  getPosts,
  getSubscription,
  getUserBookmarks,
  cancelSubscription
} from '../services/api';

const ProfilePage = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'posts');
  const [myPosts, setMyPosts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/sign-in');
      return;
    }

    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [isSignedIn, searchParams]);

  useEffect(() => {
    if (isSignedIn && user) {
      loadTabData();
    }
  }, [activeTab, isSignedIn, user]);

  const loadTabData = async () => {
    try {
      setLoading(true);
      setError(null);

      switch (activeTab) {
        case 'posts':
          const postsResponse = await getPosts({ author: user.id });
          setMyPosts(postsResponse.data.data);
          break;

        case 'subscription':
          const subResponse = await getSubscription(user.id);
          setSubscription(subResponse.data.data);
          break;

        case 'bookmarks':
          const bookmarksResponse = await getUserBookmarks(user.id);
          setBookmarks(bookmarksResponse.data.data);
          break;

        default:
          break;
      }
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error loading profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) {
      return;
    }

    try {
      await cancelSubscription(user.id);
      alert('Subscription cancelled successfully');
      loadTabData();
    } catch (error) {
      alert('Failed to cancel subscription. Please try again.');
      console.error('Error cancelling subscription:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={user.imageUrl}
            alt={user.fullName || user.username}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user.fullName || user.username}
            </h1>
            <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b overflow-x-auto">
          <button
            onClick={() => changeTab('posts')}
            className={`px-6 py-3 font-semibold whitespace-nowrap ${
              activeTab === 'posts'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            My Posts
          </button>
          <button
            onClick={() => changeTab('subscription')}
            className={`px-6 py-3 font-semibold whitespace-nowrap ${
              activeTab === 'subscription'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Subscription
          </button>
          <button
            onClick={() => changeTab('bookmarks')}
            className={`px-6 py-3 font-semibold whitespace-nowrap ${
              activeTab === 'bookmarks'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Bookmarks
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <>
              {/* My Posts Tab */}
              {activeTab === 'posts' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">My Posts</h2>
                    <Link
                      to="/blog/create"
                      className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                    >
                      Create New Post
                    </Link>
                  </div>

                  {myPosts.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">
                      You haven't created any posts yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {myPosts.map((post) => (
                        <div
                          key={post._id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <Link
                                to={`/blog/${post._id}`}
                                className="text-lg font-semibold text-gray-800 hover:text-primary"
                              >
                                {post.title}
                              </Link>
                              <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    post.isPublished
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {post.isPublished ? 'Published' : 'Draft'}
                                </span>
                                {post.isPremium && (
                                  <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                                    Premium
                                  </span>
                                )}
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    post.approvalStatus === 'APPROVED'
                                      ? 'bg-green-100 text-green-800'
                                      : post.approvalStatus === 'REJECTED'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  {post.approvalStatus}
                                </span>
                                <span>{formatDate(post.createdAt)}</span>
                              </div>
                            </div>
                            <Link
                              to={`/blog/edit/${post._id}`}
                              className="ml-4 text-primary hover:text-primary-dark"
                            >
                              Edit
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Subscription Tab */}
              {activeTab === 'subscription' && subscription && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Subscription Status
                  </h2>

                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Current Plan</p>
                        <h3 className="text-3xl font-bold text-primary mb-2">
                          {subscription.tier}
                        </h3>
                        <p className="text-sm text-gray-700">
                          Status:{' '}
                          <span
                            className={`font-semibold ${
                              subscription.status === 'ACTIVE'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {subscription.status}
                          </span>
                        </p>
                      </div>

                      {subscription.tier !== 'FREE' && (
                        <Link
                          to="/pricing"
                          className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-50 transition font-semibold"
                        >
                          Change Plan
                        </Link>
                      )}
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Credits Available</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {subscription.credits}
                        </p>
                      </div>

                      {subscription.endDate && (
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Expires On</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {formatDate(subscription.endDate)}
                          </p>
                        </div>
                      )}
                    </div>

                    {subscription.tier === 'PREMIUM' && subscription.status === 'ACTIVE' && (
                      <button
                        onClick={handleCancelSubscription}
                        className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                      >
                        Cancel Subscription
                      </button>
                    )}
                  </div>

                  {subscription.tier === 'FREE' && (
                    <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg">
                      <p className="font-semibold mb-2">Upgrade to unlock more features!</p>
                      <p className="text-sm mb-3">
                        Get access to premium posts, earn e-book credits, and enjoy an ad-free
                        experience.
                      </p>
                      <Link
                        to="/pricing"
                        className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition text-sm font-semibold"
                      >
                        View Plans
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Bookmarks Tab */}
              {activeTab === 'bookmarks' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Bookmarked Posts
                  </h2>

                  {bookmarks.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">
                        You haven't bookmarked any posts yet.
                      </p>
                      <Link
                        to="/blog"
                        className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
                      >
                        Browse Blog
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookmarks.map((bookmark) => (
                        <div
                          key={bookmark._id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                        >
                          <Link
                            to={`/blog/${bookmark.post._id}`}
                            className="block"
                          >
                            <h3 className="text-lg font-semibold text-gray-800 hover:text-primary mb-2">
                              {bookmark.post.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {bookmark.post.content.substring(0, 150)}...
                            </p>
                            <p className="text-xs text-gray-500">
                              Bookmarked: {formatDate(bookmark.createdAt)}
                            </p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
