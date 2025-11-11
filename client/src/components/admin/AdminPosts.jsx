import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { getAdminPosts, updatePostApproval } from '../../services/api';

const AdminPosts = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [status, setStatus] = useState('PENDING');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [approvalAction, setApprovalAction] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [status, search, currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getAdminPosts(user.id, {
        status,
        search,
        page: currentPage,
        limit: 10
      });

      setPosts(response.data.data);
      setTotalPages(response.data.pagination.pages);
      setError(null);
    } catch (err) {
      setError('Failed to load posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalClick = (post, action) => {
    setSelectedPost(post);
    setApprovalAction(action);
    setRejectionReason('');
    setShowModal(true);
  };

  const handleApprovalSubmit = async () => {
    if (approvalAction === 'REJECTED' && !rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    try {
      setProcessing(true);

      await updatePostApproval(
        selectedPost._id,
        user.id,
        approvalAction,
        rejectionReason
      );

      alert(`Post ${approvalAction.toLowerCase()} successfully`);
      setShowModal(false);
      fetchPosts(); // Refresh the list
    } catch (error) {
      console.error('Error updating post approval:', error);
      alert('Failed to update post approval. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Post Management</h2>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="ALL">All Posts</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Posts List */}
      {!loading && !error && (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg">No posts found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link
                          to={`/blog/${post._id}`}
                          target="_blank"
                          className="text-xl font-semibold text-gray-800 hover:text-primary"
                        >
                          {post.title}
                        </Link>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            post.approvalStatus === 'APPROVED'
                              ? 'bg-green-100 text-green-800'
                              : post.approvalStatus === 'REJECTED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {post.approvalStatus}
                        </span>
                        {post.isPremium && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                            Premium
                          </span>
                        )}
                        {post.isPublished && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                            Published
                          </span>
                        )}
                      </div>

                      <p className="text-gray-700 mb-3 line-clamp-2">
                        {post.content.substring(0, 200)}...
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>
                          <strong>Author:</strong> {post.author?.username || 'Unknown'}
                        </span>
                        <span>
                          <strong>Category:</strong> {post.category?.name || 'Uncategorized'}
                        </span>
                        <span>
                          <strong>Created:</strong> {formatDate(post.createdAt)}
                        </span>
                        <span>
                          <strong>Views:</strong> {post.viewCount || 0}
                        </span>
                        <span>
                          <strong>Likes:</strong> {post.likeCount || 0}
                        </span>
                      </div>

                      {post.rejectionReason && (
                        <div className="mt-3 bg-red-50 border border-red-200 rounded p-3">
                          <p className="text-sm text-red-800">
                            <strong>Rejection Reason:</strong> {post.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {post.approvalStatus === 'PENDING' && (
                      <div className="ml-4 flex gap-2">
                        <button
                          onClick={() => handleApprovalClick(post, 'APPROVED')}
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm font-semibold"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApprovalClick(post, 'REJECTED')}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm font-semibold"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>

              <span className="text-gray-700 px-4">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Approval Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {approvalAction === 'APPROVED' ? 'Approve Post' : 'Reject Post'}
            </h3>

            <div className="mb-4">
              <p className="text-gray-700 mb-2">
                <strong>Post:</strong> {selectedPost?.title}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Author:</strong> {selectedPost?.author?.username}
              </p>
            </div>

            {approvalAction === 'REJECTED' && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Rejection Reason *
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Explain why this post is being rejected..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleApprovalSubmit}
                disabled={processing}
                className={`flex-1 text-white px-4 py-2 rounded hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                  approvalAction === 'APPROVED' ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                {processing
                  ? 'Processing...'
                  : approvalAction === 'APPROVED'
                  ? 'Confirm Approval'
                  : 'Confirm Rejection'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                disabled={processing}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPosts;
