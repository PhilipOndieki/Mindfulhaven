import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/api';
import { Link } from 'react-router-dom';
import { SignUpButton } from '@clerk/clerk-react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts();
        setPosts(response.data.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#e8f5e9] to-white overflow-hidden -mx-6 -mt-8">
        {/* Background Pattern/Texture */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4a7c59" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center md:text-left">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover{' '}
                <span className="text-[#4a7c59] relative">
                  Mindful
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 4 Q50 0, 100 4 T200 4"
                      stroke="#8db596"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                Living
              </h1>

              {/* Description */}
              <p className="mt-8 max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed">
                Built for wellness enthusiasts and mental health professionals alike,
                Mindful Haven offers personalized programs, guided meditations, and
                community support. Start your journey toward a balanced life with
                confidence.
              </p>

              {/* CTA Button */}
              <div className="mt-10">
                <SignUpButton mode="modal">
                  <button className="group bg-[#4a7c59] text-white font-semibold rounded-full px-8 py-4 hover:bg-[#3d6b4a] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-2">
                    Get Started
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </SignUpButton>
              </div>

              {/* Social Proof */}
              <div className="mt-12 flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8db596] to-[#4a7c59] ring-2 ring-white flex items-center justify-center text-white font-semibold text-sm"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center text-gray-600 font-semibold text-xs">
                    +15K
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Trusted by{' '}
                  <strong className="text-gray-900">15,000+</strong> Mindful Users
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=600&fit=crop"
                    alt="Person meditating in peaceful nature setting"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative Element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#8db596] rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#4a7c59] rounded-full opacity-20 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            className="w-full h-auto"
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Latest Articles Section */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Latest Articles
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our latest insights on wellness, mindfulness, and mental health
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse"
              >
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-[#4a7c59] hover:text-[#3d6b4a] font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && !error && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts?.slice(0, 6).map((post) => (
              <article
                key={post._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Article Image Placeholder */}
                <div className="relative aspect-video bg-gradient-to-br from-[#e8f5e9] to-[#8db596] overflow-hidden">
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
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>              
                {/* Article Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#4a7c59] transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {post.content.substring(0, 150)}...
                  </p>
                  <Link
                    to={`/blog/${post._id}`}
                    className="inline-flex items-center text-[#4a7c59] font-medium hover:gap-2 transition-all group/link"
                  >
                    Read More
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

        {/* View All Button */}
        {!loading && !error && posts?.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#4a7c59] hover:text-[#3d6b4a] font-semibold border-2 border-[#4a7c59] hover:border-[#3d6b4a] rounded-full px-6 py-3 transition-all hover:shadow-md"
            >
              View All Articles
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Features/Benefits Section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose Mindful Haven?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: '🧘‍♀️',
                title: 'Guided Meditations',
                description: 'Access hundreds of guided meditation sessions tailored to your needs',
              },
              {
                icon: '🌱',
                title: 'Personal Growth',
                description: 'Track your progress and celebrate your wellness journey milestones',
              },
              {
                icon: '👥',
                title: 'Community Support',
                description: 'Connect with like-minded individuals on the path to mindfulness',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;