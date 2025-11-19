import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#e8f5e9] to-white py-20 -mx-6 -mt-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It <span className="text-[#4a7c59]">Works</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three Paths to Wellness & Community
          </p>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Everything you need to access support, connect with peers, and share your story.
          </p>
        </div>
      </div>

      {/* Three Feature Cards */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Discover & Learn */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
            <div className="text-5xl mb-6">🧠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Discover & Learn</h3>
            <p className="text-gray-600 mb-6">
              Access our free library of articles, guides, and resources on:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Mental health and wellness</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Stress management for exams</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Coping with anxiety and depression</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Sleep improvement strategies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Mindfulness and meditation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>HELB and financial stress</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Dealing with family pressure</span>
              </li>
            </ul>
          </div>

          {/* Engage & Connect */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
            <div className="text-5xl mb-6">💬</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Engage & Connect</h3>
            <p className="text-gray-600 mb-6">
              Build meaningful connections with fellow students:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Read real stories from peers who understand</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Comment to offer support and encouragement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Like posts to show solidarity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Bookmark helpful content for later</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Know you're not alone in your struggles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>24/7 peer support community</span>
              </li>
            </ul>
          </div>

          {/* Share Your Voice */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
            <div className="text-5xl mb-6">✍️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Voice</h3>
            <p className="text-gray-600 mb-6">
              Your story can help someone else:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Write and submit your mental health journey</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Share coping strategies that worked for you</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Quality-reviewed by our team for safety</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Published to inspire thousands of students</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Help break the stigma around mental health</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span>Become a voice of hope for others</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Give Back Section */}
      <div className="bg-gradient-to-br from-[#e8f5e9] to-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-6">💚</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Optional: Give Back</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If Mindful Haven helped you and you're able, consider donating KSh 50-500 to keep
              the platform free for students who can't afford to give.
            </p>
            <p className="text-gray-500 italic mb-8">
              No pressure. No guilt. Just community supporting community.
            </p>
            <Link
              to="/community"
              className="inline-block bg-[#4a7c59] text-white font-semibold rounded-full px-8 py-4 hover:bg-[#3d6b4a] transition-all shadow-lg"
            >
              Support the Community
            </Link>
          </div>
        </div>
      </div>

      {/* Get Started Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of Kenyan university students supporting each other through
            mental health challenges. It's free, anonymous, and always here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/resources"
              className="inline-block bg-[#4a7c59] text-white font-semibold rounded-full px-8 py-4 hover:bg-[#3d6b4a] transition-all shadow-lg"
            >
              Browse Resources
            </Link>
            <Link
              to="/community"
              className="inline-block bg-white text-[#4a7c59] font-semibold rounded-full px-8 py-4 border-2 border-[#4a7c59] hover:bg-[#e8f5e9] transition-all"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
