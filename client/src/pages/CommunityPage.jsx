import React from 'react';
import { Link } from 'react-router-dom';
import { SignUpButton, SignedOut, SignedIn } from '@clerk/clerk-react';

const CommunityPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#e8f5e9] to-white py-20 -mx-6 -mt-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our <span className="text-[#4a7c59]">Community</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with thousands of Kenyan students on their wellness journey
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="bg-[#4a7c59] text-white px-4 py-2 rounded-full text-sm font-medium">
              100% Free
            </span>
            <span className="bg-[#4a7c59] text-white px-4 py-2 rounded-full text-sm font-medium">
              100% Supportive
            </span>
            <span className="bg-[#4a7c59] text-white px-4 py-2 rounded-full text-sm font-medium">
              100% Stigma-Free
            </span>
          </div>
        </div>
      </div>

      {/* Safe Space Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Safe Space for Students</h2>
          <p className="text-gray-600 leading-relaxed">
            Mindful Haven is more than a platform—it's a community of Kenyan university students
            supporting each other through mental health challenges. Whether you're at UoN, JKUAT,
            Strathmore, or any other university, you'll find peers who understand what you're going through.
          </p>
        </div>

        {/* Community Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Peer Support */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Peer Support</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Real students sharing real experiences</li>
              <li>• Anonymous support without judgment</li>
              <li>• "You're not alone" moments every day</li>
              <li>• Encouragement from those who understand</li>
            </ul>
          </div>

          {/* Active Engagement */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Active Engagement</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Like posts to show solidarity</li>
              <li>• Comment with support and advice</li>
              <li>• Share your own coping strategies</li>
              <li>• Build meaningful connections</li>
            </ul>
          </div>

          {/* Safe & Moderated */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Safe & Moderated</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• All user posts reviewed for quality and safety</li>
              <li>• Evidence-based content from experts</li>
              <li>• Respectful, supportive community guidelines</li>
              <li>• Anonymous profiles to protect your privacy</li>
            </ul>
          </div>

          {/* Available 24/7 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Available 24/7</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Access support whenever you need it</li>
              <li>• Help at 2am when anxiety hits</li>
              <li>• No wait times, no appointments needed</li>
              <li>• Always here for you</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Student Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Students Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 italic mb-6">
                "I love that I can read AND contribute. My story might help someone."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#4a7c59] font-bold">
                  A
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Anonymous</p>
                  <p className="text-gray-500 text-xs">UoN Student</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 italic mb-6">
                "Finally, a place where my voice matters and I can support others too."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#4a7c59] font-bold">
                  A
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Anonymous</p>
                  <p className="text-gray-500 text-xs">JKUAT Student</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 italic mb-6">
                "The bookmark feature helps me save articles for when I'm struggling."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#4a7c59] font-bold">
                  A
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Anonymous</p>
                  <p className="text-gray-500 text-xs">TU-K Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join CTA */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-[#e8f5e9] to-white rounded-3xl p-12 text-center border border-[#4a7c59]/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Today - It's Free</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Become part of a supportive community of students who understand what you're going through.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="bg-[#4a7c59] text-white font-semibold rounded-full px-10 py-4 hover:bg-[#3d6b4a] transition-all shadow-lg text-lg">
                Sign Up Free
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link
              to="/resources"
              className="inline-block bg-[#4a7c59] text-white font-semibold rounded-full px-10 py-4 hover:bg-[#3d6b4a] transition-all shadow-lg text-lg"
            >
              Explore Resources
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Support the Community */}
      <div className="bg-gradient-to-r from-[#4a7c59] to-[#3d6b4a] py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Support the Community</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            If Mindful Haven has helped you, consider donating to keep it free for students who need it most:
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">KSh 50</p>
              <p className="text-white/70 text-sm">Buy us a chai</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">KSh 100</p>
              <p className="text-white/70 text-sm">Support 10 students</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">KSh 500</p>
              <p className="text-white/70 text-sm">Sponsor content creation</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">Custom</p>
              <p className="text-white/70 text-sm">Give what you can</p>
            </div>
          </div>
          <button className="bg-white text-[#4a7c59] font-semibold rounded-full px-8 py-4 hover:bg-gray-100 transition-all shadow-lg">
            Donate with M-Pesa
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
