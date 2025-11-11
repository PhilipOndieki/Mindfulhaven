import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { verifyPurchase, verifySubscription } from '../services/api';

const PaymentVerifyPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [paymentType, setPaymentType] = useState(null); // 'ebook' or 'subscription'
  const [data, setData] = useState(null);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    const reference = searchParams.get('reference');
    const trxref = searchParams.get('trxref'); // Paystack returns this
    const paymentReference = reference || trxref;

    if (!paymentReference) {
      setStatus('error');
      setMessage('No payment reference found');
      return;
    }

    try {
      setStatus('verifying');

      // First try to verify as ebook purchase
      try {
        const response = await verifyPurchase(paymentReference);
        setStatus('success');
        setPaymentType('ebook');
        setData(response.data.data);
        setMessage('E-book purchase verified successfully!');
      } catch (ebookError) {
        // If ebook verification fails, try subscription verification
        const response = await verifySubscription(paymentReference);
        setStatus('success');
        setPaymentType('subscription');
        setData(response.data.data);
        setMessage('Subscription payment verified successfully!');
      }
    } catch (error) {
      setStatus('error');
      setMessage(
        error.response?.data?.message ||
        'Payment verification failed. Please contact support if you were charged.'
      );
      console.error('Payment verification error:', error);
    }
  };

  const handleContinue = () => {
    if (paymentType === 'ebook') {
      navigate(`/ebooks/${data.purchase.ebook._id}`);
    } else if (paymentType === 'subscription') {
      navigate('/profile?tab=subscription');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        {status === 'verifying' && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verifying Payment...
            </h2>
            <p className="text-gray-600">
              Please wait while we confirm your payment
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>

            {paymentType === 'ebook' && data?.purchase?.ebook && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-gray-600 mb-2">You purchased:</p>
                <p className="font-semibold text-gray-800">
                  {data.purchase.ebook.title}
                </p>
                <p className="text-sm text-gray-600">
                  by {data.purchase.ebook.author}
                </p>
              </div>
            )}

            {paymentType === 'subscription' && data?.subscription && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-gray-600 mb-2">Your new plan:</p>
                <p className="font-semibold text-gray-800 text-xl">
                  {data.subscription.tier}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Credits: {data.subscription.credits}
                </p>
              </div>
            )}

            <button
              onClick={handleContinue}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition font-semibold mb-3"
            >
              Continue
            </button>

            <Link
              to="/"
              className="block text-primary hover:text-primary-dark text-sm"
            >
              Go to Homepage
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition font-semibold"
              >
                Try Again
              </button>

              <Link
                to="/"
                className="block w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-semibold text-center"
              >
                Go to Homepage
              </Link>

              <p className="text-sm text-gray-600 mt-4">
                If you were charged but verification failed, please contact support
                with your payment reference.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentVerifyPage;
