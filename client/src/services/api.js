import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Post services
export const getPosts = (params = {}) => api.get('/posts', { params });
export const getPost = (id) => api.get(`/posts/${id}`);
export const createPost = (post) => api.post('/posts', post);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const createOrGetUser = (userData) => api.post('/users', userData);

// Comment services
export const getComments = (postId, params = {}) => api.get(`/posts/${postId}/comments`, { params });
export const createComment = (postId, commentData) => api.post(`/posts/${postId}/comments`, commentData);
export const updateComment = (commentId, commentData) => api.put(`/comments/${commentId}`, commentData);
export const deleteComment = (commentId, clerkId) => api.delete(`/comments/${commentId}`, { data: { clerkId } });

// Response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);


// Category services
export const getCategories = () => api.get('/categories');
export const createCategory = (category) => api.post('/categories', category);

// Ebook services
export const getEbooks = (params = {}) => api.get('/ebooks', { params });
export const getEbook = (id) => api.get(`/ebooks/${id}`);
export const createEbook = (ebook) => api.post('/ebooks', ebook);
export const updateEbook = (id, ebook) => api.put(`/ebooks/${id}`, ebook);
export const deleteEbook = (id) => api.delete(`/ebooks/${id}`);
export const checkEbookOwnership = (id, clerkUserId) => api.get(`/ebooks/${id}/ownership/${clerkUserId}`);
export const getUserPurchases = (clerkUserId, params = {}) => api.get(`/ebooks/my-purchases/${clerkUserId}`, { params });
export const getEbookCategories = () => api.get('/ebooks/categories');

// Purchase services
export const initializePurchase = (data) => api.post('/purchases/initialize', data);
export const verifyPurchase = (reference) => api.post('/purchases/verify', { reference });
export const downloadEbook = (purchaseId, clerkUserId) => api.get(`/purchases/${purchaseId}/download`, { params: { clerkUserId } });
export const getPurchaseHistory = (clerkUserId, params = {}) => api.get(`/purchases/history/${clerkUserId}`, { params });

// Subscription services
export const getSubscription = (clerkUserId) => api.get(`/subscriptions/${clerkUserId}`);
export const initializeSubscription = (data) => api.post('/subscriptions/initialize', data);
export const verifySubscription = (reference) => api.post('/subscriptions/verify', { reference });
export const cancelSubscription = (clerkUserId) => api.post('/subscriptions/cancel', { clerkUserId });
export const useCredits = (clerkUserId, amount) => api.post('/subscriptions/use-credits', { clerkUserId, amount });

// Bookmark services
export const toggleBookmark = (postId, clerkUserId) => api.post(`/bookmarks/${postId}`, { clerkUserId });
export const getUserBookmarks = (clerkUserId, params = {}) => api.get(`/bookmarks/${clerkUserId}`, { params });
export const checkBookmark = (postId, clerkUserId) => api.get(`/bookmarks/${postId}/check/${clerkUserId}`);
export const removeBookmark = (bookmarkId, clerkUserId) => api.delete(`/bookmarks/${bookmarkId}`, { params: { clerkUserId } });

// Like services
export const toggleLike = (postId, clerkUserId) => api.post(`/posts/${postId}/like`, { clerkUserId });
export const getPostLikes = (postId, clerkUserId) => api.get(`/posts/${postId}/likes`, { params: { clerkUserId } });

// Admin services
export const getAdminStats = (clerkUserId) => api.get('/admin/stats', { params: { clerkUserId } });
export const getAdminPosts = (clerkUserId, params = {}) => api.get('/admin/posts', { params: { ...params, clerkUserId } });
export const updatePostApproval = (postId, clerkUserId, approvalStatus, rejectionReason) =>
  api.put(`/admin/posts/${postId}/approve`, { clerkUserId, approvalStatus, rejectionReason });
export const getAdminUsers = (clerkUserId, params = {}) => api.get('/admin/users', { params: { ...params, clerkUserId } });
export const updateUserRole = (userId, clerkUserId, role) => api.put(`/admin/users/${userId}/role`, { clerkUserId, role });
export const getAdminEbooks = (clerkUserId, params = {}) => api.get('/admin/ebooks', { params: { ...params, clerkUserId } });
export const getAdminPurchases = (clerkUserId, params = {}) => api.get('/admin/purchases', { params: { ...params, clerkUserId } });
export const getAdminSubscriptions = (clerkUserId, params = {}) => api.get('/admin/subscriptions', { params: { ...params, clerkUserId } });

export default api;
