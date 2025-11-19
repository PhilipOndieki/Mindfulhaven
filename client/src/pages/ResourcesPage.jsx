import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/api';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ResourcesPage = () => {
  const { isSignedIn } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Mental Health',
    'Stress Relief',
    'Sleep',
    'Wellness',
    'Mindfulness',
    'Student Life',
    'Coping Strategies'
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPosts();
        setPosts(response.data.data || []);
        setFilteredPosts(response.data.data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError({
          message: 'Unable to load resources',
          details: error.response?.data?.message || 'Please check your connection and try again.',
          code: error.response?.status || 500
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Search and filter functionality
  useEffect(() => {
    let filtered = posts;

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, posts, selectedCategory]);

  const handleRetry = () => {
    window.location.reload();
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero Skeleton */}
        <div className="relative bg-gradient-to-br from-[#e8f5e9] to-white py-16 -mx-6 -mt-8 mb-12">
          <div className="container mx-auto px-6 text-center">
            <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse"></div>
          </div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="h-12 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {error.message}
          </h2>
          <p className="text-gray-600 mb-6">
            {error.details}
          </p>

          {error.code && (
            <p className="text-sm text-gray-500 mb-6">
              Error Code: {error.code}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] text-white font-semibold rounded-full px-6 py-3 hover:bg-[#3d6b4a] transition-all shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-full px-6 py-3 hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#e8f5e9] to-white py-16 -mx-6 -mt-8 mb-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Wellness <span className="text-[#4a7c59]">Resources</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            Expert articles, guides, and tools for Kenyan university students
          </p>
          <p className="text-gray-500">
            Evidence-based content to support your mental health journey.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 pl-12 rounded-full border-2 border-gray-200 focus:border-[#4a7c59] focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-[#4a7c59] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Share Your Story Button */}
      {isSignedIn && (
        <div className="text-center mb-8">
          <Link
            to="/resources/create"
            className="inline-flex items-center gap-2 bg-[#4a7c59] text-white font-semibold rounded-full px-6 py-3 hover:bg-[#3d6b4a] transition-all shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Share Your Story
          </Link>
          <p className="text-gray-500 text-sm mt-2">
            Have something to share? Submit your story to help other students.
          </p>
        </div>
      )}

      {/* Results Count */}
      {searchTerm && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Found <strong className="text-gray-900">{filteredPosts?.length}</strong> article{filteredPosts.length !== 1 ? 's' : ''} matching "{searchTerm}"
          </p>
        </div>
      )}

      {/* No Results State */}
      {(filteredPosts?.length === 0 || !filteredPosts) && !loading && !error && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No articles found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or browse all articles
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="text-[#4a7c59] hover:text-[#3d6b4a] font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Resources Grid */}
      {filteredPosts?.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Article Image */}
              <div className="relative aspect-video bg-gradient-to-br from-[#e8f5e9] to-[#8db596]">
                {post.featuredImage ? (
                  <>
                    <div className="absolute inset-0 animate-pulse" />
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="relative w-full h-full object-cover"
                      loading="lazy"
                      onLoad={(e) => {
                        if (e.target.previousSibling) {
                          e.target.previousSibling.style.display = 'none';
                        }
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </>
                ) : null}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-3">
                    <svg className="w-6 h-6 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-[#4a7c59] bg-[#e8f5e9] rounded-full">
                    {post.category || 'Wellness'}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#4a7c59] transition-colors line-clamp-2 mb-3">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                  {post.content.substring(0, 150)}...
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    5 min read
                  </span>
                  <span>
                    {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                {/* Read More Link */}
                <Link
                  to={`/resources/${post._id}`}
                  className="inline-flex items-center text-[#4a7c59] font-medium hover:gap-2 transition-all group/link"
                >
                  Read Article
                  <svg
                    className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Back to Top */}
      {filteredPosts?.length > 0 && (
        <div className="text-center mt-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#4a7c59] font-medium transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            Back to Top
          </button>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
