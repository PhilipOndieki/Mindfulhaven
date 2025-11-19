import React from 'react';

const ForUniversitiesPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#e8f5e9] to-white py-20 -mx-6 -mt-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            For <span className="text-[#4a7c59]">Universities</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Partner With Us to Support Your Students' Mental Health
          </p>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Cost-effective, scalable mental health support that complements your counseling services.
          </p>
        </div>
      </div>

      {/* The Challenge Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Partner With Mindful Haven?
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* The Challenge */}
          <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              The Challenge Universities Face
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-700">Limited counseling staff (2-3 counselors for 15,000+ students)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-700">Long wait times (3-6 weeks for appointments)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-700">Office hours only (no 24/7 support)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-700">High student dropout rates due to mental health issues</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-700">Increasing demand with limited resources</span>
              </li>
            </ul>
          </div>

          {/* Our Solution */}
          <div className="bg-[#e8f5e9] rounded-2xl p-8 border border-[#4a7c59]/20">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-[#4a7c59]">✓</span>
              Our Solution
            </h3>
            <p className="text-gray-700 mb-4">
              Mindful Haven provides FREE, 24/7 digital mental health support that:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span className="text-gray-700">Complements your existing counseling services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span className="text-gray-700">Reaches students who won't come to your office</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span className="text-gray-700">Provides anonymous support to reduce stigma</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span className="text-gray-700">Scales with your student population</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4a7c59] mt-1">•</span>
                <span className="text-gray-700">Tracks anonymized wellbeing data for insights</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Partnership Benefits */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Partnership Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Analytics Dashboard */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Analytics Dashboard</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>Track anonymized student engagement and wellbeing trends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>Identify peak stress periods (e.g., exam season)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>Measure impact of mental health initiatives</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>Data-driven insights for better support services</span>
                </li>
              </ul>
            </div>

            {/* Institutional Access */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Institutional Access</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>White-labeled platform with your university branding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>Custom content relevant to your campus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>Integration with existing student support services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>Referral pathways to your counseling center</span>
                </li>
              </ul>
            </div>

            {/* Cost-Effective Solution */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cost-Effective Solution</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>KSh 50,000-100,000 per year for entire student body</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>Cost: KSh 5-10 per student annually (less than one lunch)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>No per-session fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>Unlimited student access</span>
                </li>
              </ul>
            </div>

            {/* Campus Wellness Support */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Campus Wellness Support</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>Campus ambassador program to promote platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>Mental health awareness campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>Integration with student orientation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4a7c59] mt-1">•</span>
                  <span>Ongoing support and training for your staff</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Universities */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner Universities</h2>
          <p className="text-gray-600 mb-12">
            Join leading Kenyan universities in supporting student mental health
          </p>
          <div className="bg-gray-50 rounded-2xl p-12 border border-gray-200">
            <p className="text-gray-500 italic">
              Partner university logos will be featured here
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-[#4a7c59] to-[#3d6b4a] py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to bring Mindful Haven to your campus?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can support your students' mental health journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:philipbarongo30@gmail.com"
              className="inline-flex items-center gap-2 bg-white text-[#4a7c59] font-semibold rounded-full px-8 py-4 hover:bg-gray-100 transition-all shadow-lg"
            >
              <span>📧</span>
              <span>philipbarongo30@gmail.com</span>
            </a>
            <a
              href="tel:+254703141296"
              className="inline-flex items-center gap-2 bg-transparent text-white font-semibold rounded-full px-8 py-4 border-2 border-white hover:bg-white/10 transition-all"
            >
              <span>📱</span>
              <span>+254 703 141 296</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForUniversitiesPage;
