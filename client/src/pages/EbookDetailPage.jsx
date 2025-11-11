import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import {
  getEbook,
  checkEbookOwnership,
  initializePurchase,
  downloadEbook,
  getSubscription
} from '../services/api';

const EbookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();

  const [ebook, setEbook] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [ownership, setOwnership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState(null);
  const [purchaseMethod, setPurchaseMethod] = useState('cash'); // 'cash' or 'credits'

  useEffect(() => {
    fetchEbookDetails();
  }, [id, user]);

  const fetchEbookDetails = async () => {
    try {
      setLoading(true);

      // Fetch ebook details
      const ebookResponse = await getEbook(id);
      setEbook(ebookResponse.data.data);

      // If user is signed in, check ownership and subscription
      if (isSignedIn && user) {
        const [ownershipResponse, subscriptionResponse] = await Promise.all([
          checkEbookOwnership(id, user.id),
          getSubscription(user.id)
        ]);

        setOwnership(ownershipResponse.data.data);
        setSubscription(subscriptionResponse.data.data);
      }

      setError(null);
    } catch (err) {
      setError('Failed to load e-book details. Please try again later.');
      console.error('Error fetching ebook details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!isSignedIn) {
      navigate('/sign-in');
      return;
    }

    try {
      setPurchasing(true);
      setError(null);

      const purchaseData = {
        ebookId: id,
        clerkUserId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        purchaseType: purchaseMethod.toUpperCase()
      };

      const response = await initializePurchase(purchaseData);

      if (purchaseMethod === 'credits') {
        // Credits purchase is instant
        alert('E-book purchased successfully with credits!');
        fetchEbookDetails(); // Refresh to show ownership
      } else {
        // Redirect to Paystack payment page
        window.location.href = response.data.data.paymentUrl;
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to initialize purchase. Please try again.'
      );
      console.error('Error purchasing ebook:', err);
    } finally {
      setPurchasing(false);
    }
  };

  const handleDownload = async () => {
    if (!ownership?.purchase) return;

    try {
      const response = await downloadEbook(ownership.purchase._id, user.id);
      // Open download URL in new tab
      window.open(response.data.data.downloadUrl, '_blank');
    } catch (err) {
      setError('Failed to download e-book. Please try again.');
      console.error('Error downloading ebook:', err);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading e-book details...</p>
        </div>
      </div>
    );
  }

  if (error && !ebook) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!ebook) return null;

  const canUseCredits =
    subscription &&
    subscription.credits >= ebook.credits &&
    ebook.credits > 0;

  const isPremiumRequired =
    ebook.isPremiumOnly &&
    (!subscription || subscription.tier === 'FREE');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to="/ebooks"
        className="inline-flex items-center text-primary hover:text-primary-dark mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to E-books
      </Link>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column - Cover Image */}
        <div className="md:col-span-1">
          <div className="sticky top-4">
            <img
              src={ebook.coverImage}
              alt={ebook.title}
              className="w-full rounded-lg shadow-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
              }}
            />
            {ebook.isPremiumOnly && (
              <div className="mt-2 bg-yellow-100 border border-yellow-300 text-yellow-800 px-3 py-2 rounded text-sm text-center">
                Premium+ Only
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Details and Purchase */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{ebook.title}</h1>
          <p className="text-xl text-gray-600 mb-4">by {ebook.author}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <span className="bg-secondary text-primary px-3 py-1 rounded">
              {ebook.category}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded">
              {ebook.format}
            </span>
            <span className="text-gray-600">{ebook.pages} pages</span>
            <span className="text-gray-600">{ebook.downloads} downloads</span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{ebook.description}</p>
          </div>

          {/* Purchase Section */}
          {ownership?.owned ? (
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-green-800">You own this e-book!</h3>
                  <p className="text-green-600 text-sm">
                    Downloaded {ownership.purchase.downloadCount} times
                  </p>
                </div>
                <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <button
                onClick={handleDownload}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Download E-book
              </button>
            </div>
          ) : (
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Purchase Options</h3>

              {/* Premium Required Warning */}
              {isPremiumRequired && (
                <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg mb-4">
                  <p className="font-semibold">Premium+ Subscription Required</p>
                  <p className="text-sm mt-1">
                    This e-book is only available to Premium and Lifetime members.
                  </p>
                  <Link
                    to="/pricing"
                    className="inline-block mt-2 text-sm underline hover:no-underline"
                  >
                    Upgrade to Premium →
                  </Link>
                </div>
              )}

              {/* Price Display */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-primary mb-2">
                  {formatPrice(ebook.price)}
                </p>
                {ebook.credits > 0 && canUseCredits && (
                  <p className="text-gray-600">
                    or use {ebook.credits} credits (You have {subscription.credits})
                  </p>
                )}
              </div>

              {/* Purchase Method Selection */}
              {!isPremiumRequired && (
                <>
                  {ebook.credits > 0 && isSignedIn && (
                    <div className="mb-4 space-y-2">
                      <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="purchaseMethod"
                          value="cash"
                          checked={purchaseMethod === 'cash'}
                          onChange={(e) => setPurchaseMethod(e.target.value)}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <p className="font-semibold">Pay with Card</p>
                          <p className="text-sm text-gray-600">{formatPrice(ebook.price)} via Paystack</p>
                        </div>
                      </label>

                      {canUseCredits && (
                        <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="purchaseMethod"
                            value="credits"
                            checked={purchaseMethod === 'credits'}
                            onChange={(e) => setPurchaseMethod(e.target.value)}
                            className="mr-3"
                          />
                          <div className="flex-1">
                            <p className="font-semibold">Pay with Credits</p>
                            <p className="text-sm text-gray-600">
                              {ebook.credits} credits (You have {subscription.credits})
                            </p>
                          </div>
                        </label>
                      )}

                      {ebook.credits > 0 && !canUseCredits && subscription && (
                        <div className="bg-gray-50 border border-gray-300 p-3 rounded-lg">
                          <p className="text-sm text-gray-700">
                            You need {ebook.credits} credits to purchase with credits.
                            Current balance: {subscription.credits} credits.
                          </p>
                          <Link
                            to="/pricing"
                            className="text-primary text-sm underline hover:no-underline mt-1 inline-block"
                          >
                            Get more credits →
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Purchase Button */}
                  <button
                    onClick={handlePurchase}
                    disabled={purchasing || isPremiumRequired}
                    className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {purchasing ? 'Processing...' :
                     purchaseMethod === 'credits' ? 'Purchase with Credits' :
                     'Purchase with Card'}
                  </button>

                  {!isSignedIn && (
                    <p className="text-center text-sm text-gray-600 mt-4">
                      Please{' '}
                      <Link to="/sign-in" className="text-primary underline hover:no-underline">
                        sign in
                      </Link>{' '}
                      to purchase this e-book
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {/* Tags */}
          {ebook.tags && ebook.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {ebook.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EbookDetailPage;
