import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { initializeDonation } from '../services/api';

const DonatePage = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: '',
    customAmount: '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    donorName: user?.fullName || '',
    message: '',
    isAnonymous: false
  });

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const predefinedAmounts = [50, 100, 500, 1000, 2000, 5000];

  const handleAmountClick = (amount) => {
    setFormData(prev => ({
      ...prev,
      amount: amount,
      customAmount: ''
    }));
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      customAmount: value,
      amount: value
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const donationAmount = parseFloat(formData.customAmount || formData.amount);

    if (!donationAmount || donationAmount < 50) {
      setError('Minimum donation amount is KSh 50');
      return;
    }

    if (!formData.email) {
      setError('Email is required for donation receipt');
      return;
    }

    try {
      setProcessing(true);

      const donationData = {
        amount: donationAmount,
        email: formData.email,
        donorName: formData.isAnonymous ? 'Anonymous' : formData.donorName || 'Anonymous',
        message: formData.message,
        isAnonymous: formData.isAnonymous,
        clerkUserId: isSignedIn ? user.id : null
      };

      const response = await initializeDonation(donationData);

      // Redirect to Paystack payment page
      window.location.href = response.data.data.paymentUrl;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process donation. Please try again.');
      console.error('Donation error:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support <span className="text-[#4a7c59]">Mindful Haven</span>
          </h1>
          <p className="text-lg text-gray-600">
            Your donation helps keep mental health support free for Kenyan university students
          </p>
        </div>

        {/* Impact Section */}
        <div className="bg-[#e8f5e9] rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Impact</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-[#4a7c59]">KSh 50</p>
              <p className="text-gray-600">Supports 10 students for a month</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-[#4a7c59]">KSh 500</p>
              <p className="text-gray-600">Funds content creation</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-[#4a7c59]">KSh 1,000</p>
              <p className="text-gray-600">Covers hosting for a month</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-[#4a7c59]">Custom</p>
              <p className="text-gray-600">Every amount helps!</p>
            </div>
          </div>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Predefined Amounts */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Select Amount
              </label>
              <div className="grid grid-cols-3 gap-3">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountClick(amount)}
                    className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                      formData.amount === amount && !formData.customAmount
                        ? 'border-[#4a7c59] bg-[#e8f5e9] text-[#4a7c59]'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    KSh {amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label htmlFor="customAmount" className="block text-sm font-semibold text-gray-900 mb-2">
                Or Enter Custom Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  KSh
                </span>
                <input
                  type="number"
                  id="customAmount"
                  name="customAmount"
                  value={formData.customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Enter amount"
                  min="50"
                  className="w-full pl-14 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#4a7c59] focus:outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum: KSh 50</p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#4a7c59] focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">For donation receipt</p>
            </div>

            {/* Donor Name */}
            <div>
              <label htmlFor="donorName" className="block text-sm font-semibold text-gray-900 mb-2">
                Your Name (Optional)
              </label>
              <input
                type="text"
                id="donorName"
                name="donorName"
                value={formData.donorName}
                onChange={handleChange}
                placeholder="Enter your name"
                disabled={formData.isAnonymous}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#4a7c59] focus:outline-none disabled:bg-gray-100"
              />
            </div>

            {/* Anonymous Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isAnonymous"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleChange}
                className="w-5 h-5 text-[#4a7c59] border-gray-300 rounded focus:ring-[#4a7c59]"
              />
              <label htmlFor="isAnonymous" className="text-sm font-medium text-gray-900">
                Make this donation anonymous
              </label>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share why you're supporting Mindful Haven..."
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#4a7c59] focus:outline-none resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.message.length}/500 characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing || (!formData.amount && !formData.customAmount)}
              className="w-full bg-[#4a7c59] text-white font-semibold py-4 rounded-lg hover:bg-[#3d6b4a] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Processing...' : `Donate ${formData.customAmount || formData.amount ? `KSh ${formData.customAmount || formData.amount}` : ''}`}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure payment powered by Paystack
            </p>
          </div>
        </div>

        {/* Why Donate Section */}
        <div className="mt-8 bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Why Your Donation Matters</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-[#4a7c59] mt-1">✓</span>
              <span>Keeps the platform completely free for all students</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#4a7c59] mt-1">✓</span>
              <span>Funds creation of new mental health resources</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#4a7c59] mt-1">✓</span>
              <span>Supports community moderation and safety</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#4a7c59] mt-1">✓</span>
              <span>Covers hosting and technical maintenance</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#4a7c59] mt-1">✓</span>
              <span>100% of donations go directly to platform operations</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;