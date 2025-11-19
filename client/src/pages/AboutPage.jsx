import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#e8f5e9] to-white py-20 -mx-6 -mt-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-[#4a7c59]">Mindful Haven</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Breaking barriers to student mental wellness in Kenya
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Mindful Haven, we believe every Kenyan university student deserves access to
              mental health support—regardless of their ability to pay. Our mission is to provide
              a free, safe digital space where students can discover evidence-based wellness content,
              connect with peers facing similar challenges, and share their own stories to help others.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We're built BY students, FOR students. We understand HELB stress, exam anxiety,
              family pressure, and the unique challenges of being a Kenyan university student.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#e8f5e9] to-[#8db596] rounded-2xl p-12 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎓</div>
              <p className="text-gray-700 font-semibold">Supporting 1,000+ Kenyan Students</p>
              <p className="text-gray-600 text-sm mt-2">Growing community of peer support and shared healing</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">The Problem We're Solving</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                stat: '78%',
                description: 'of Kenyan university students experience stress, anxiety, or depression'
              },
              {
                stat: '1:500,000',
                description: 'psychiatrist to population ratio in Kenya'
              },
              {
                stat: '85%',
                description: 'of students don\'t seek help due to stigma and cost'
              },
              {
                stat: '2-3',
                description: 'counselors for 15,000+ students at most universities'
              },
              {
                stat: 'KSh 3,000-8,000',
                description: 'cost per private therapy session (unaffordable for most students)'
              },
              {
                stat: '3-6 weeks',
                description: 'average wait time for university counseling appointments'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-[#4a7c59] mb-2">{item.stat}</div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Mindful Haven Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Mindful Haven?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: '💚',
              title: '100% FREE',
              description: 'No paywalls, ever. Mental health support shouldn\'t depend on your wallet.'
            },
            {
              icon: '🔒',
              title: 'Anonymous & Safe',
              description: 'Stigma-free space where your identity is protected.'
            },
            {
              icon: '🌙',
              title: 'Available 24/7',
              description: 'Support when you need it most, even at 2am during exam season.'
            },
            {
              icon: '🤝',
              title: 'Community-Driven',
              description: 'Real student voices sharing real experiences and coping strategies.'
            }
          ].map((value, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-gradient-to-br from-[#e8f5e9] to-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Mindful Haven was born from a simple observation: too many Kenyan university students
              were suffering in silence. We saw friends struggle with anxiety before exams, classmates
              battle depression alone, and talented students drop out because they couldn't afford
              help or were too afraid to ask for it.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We decided to change that. By creating a platform where students can access free resources,
              share their experiences anonymously, and find solidarity with peers who truly understand
              their struggles—from HELB delays to family expectations to the pressure of being the first
              in their family to attend university.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#4a7c59] to-[#3d6b4a] py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            You're not alone in this. Join thousands of Kenyan students supporting each other
            through the challenges of university life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/community"
              className="inline-block bg-white text-[#4a7c59] font-semibold rounded-full px-8 py-4 hover:bg-gray-100 transition-all shadow-lg"
            >
              Join the Community
            </Link>
            <Link
              to="/resources"
              className="inline-block bg-transparent text-white font-semibold rounded-full px-8 py-4 border-2 border-white hover:bg-white/10 transition-all"
            >
              Explore Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
