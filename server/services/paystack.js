const axios = require('axios');

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

class PaystackService {
  constructor() {
    this.client = axios.create({
      baseURL: PAYSTACK_BASE_URL,
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Initialize a payment transaction
   * @param {Object} data - Payment initialization data
   * @param {string} data.email - Customer email
   * @param {number} data.amount - Amount in kobo (multiply NGN by 100) or pesewas for GHS
   * @param {string} data.reference - Unique transaction reference
   * @param {string} data.callback_url - URL to redirect after payment
   * @param {Object} data.metadata - Additional payment metadata
   */
  async initializePayment(data) {
    try {
      const response = await this.client.post('/transaction/initialize', {
        email: data.email,
        amount: Math.round(data.amount * 100), // Convert to kobo/pesewas
        reference: data.reference,
        callback_url: data.callback_url,
        metadata: data.metadata || {},
        currency: data.currency || 'KES' // Default to Kenyan Shillings
      });

      return response.data;
    } catch (error) {
      console.error('Paystack initialization error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to initialize payment');
    }
  }

  /**
   * Verify a payment transaction
   * @param {string} reference - Transaction reference
   */
  async verifyPayment(reference) {
    try {
      const response = await this.client.get(`/transaction/verify/${reference}`);
      return response.data;
    } catch (error) {
      console.error('Paystack verification error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to verify payment');
    }
  }

  /**
   * Get transaction details
   * @param {string} id - Transaction ID
   */
  async getTransaction(id) {
    try {
      const response = await this.client.get(`/transaction/${id}`);
      return response.data;
    } catch (error) {
      console.error('Paystack get transaction error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to get transaction');
    }
  }

  /**
   * List transactions
   * @param {Object} params - Query parameters
   */
  async listTransactions(params = {}) {
    try {
      const response = await this.client.get('/transaction', { params });
      return response.data;
    } catch (error) {
      console.error('Paystack list transactions error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to list transactions');
    }
  }

  /**
   * Create a subscription plan
   * @param {Object} data - Plan data
   */
  async createPlan(data) {
    try {
      const response = await this.client.post('/plan', data);
      return response.data;
    } catch (error) {
      console.error('Paystack create plan error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to create plan');
    }
  }

  /**
   * Create a subscription
   * @param {Object} data - Subscription data
   */
  async createSubscription(data) {
    try {
      const response = await this.client.post('/subscription', data);
      return response.data;
    } catch (error) {
      console.error('Paystack create subscription error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to create subscription');
    }
  }

  /**
   * Cancel a subscription
   * @param {string} code - Subscription code
   * @param {string} token - Email token
   */
  async cancelSubscription(code, token) {
    try {
      const response = await this.client.post('/subscription/disable', {
        code,
        token
      });
      return response.data;
    } catch (error) {
      console.error('Paystack cancel subscription error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to cancel subscription');
    }
  }

  /**
   * Generate a unique payment reference
   * @param {string} prefix - Reference prefix (e.g., 'ebook', 'sub')
   */
  generateReference(prefix = 'txn') {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    return `${prefix}_${timestamp}_${random}`;
  }
}

module.exports = new PaystackService();
