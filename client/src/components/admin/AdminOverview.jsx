import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getAdminStats } from '../../services/api';
import AnimatedCounter from '../AnimatedCounter';

const AdminOverview = () => {
  const { user } = useUser();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getAdminStats(user.id);
      setStats(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load statistics');
      console.error('Error fetching admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'Pending Approval',
      value: stats.pendingPosts,
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      alert: stats.pendingPosts > 0
    },
    {
      title: 'Total E-books',
      value: stats.totalEbooks,
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      title: 'Premium Users',
      value: stats.premiumUsers,
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
      color: 'indigo',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600'
    },
    {
      title: 'Total Purchases',
      value: stats.totalPurchases,
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      color: 'pink',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg border-2 ${
              stat.alert ? 'border-yellow-300' : 'border-gray-200'
            } p-6 hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <svg
                  className={`w-6 h-6 ${stat.textColor}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={stat.icon}
                  />
                </svg>
              </div>
              {stat.alert && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                  Action Needed
                </span>
              )}
            </div>

            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-800">
              {stat.title === 'Total Revenue' ? (
                <AnimatedCounter
                  value={stats.totalRevenue}
                  formatValue={(val) => formatCurrency(val)}
                />
              ) : typeof stat.value === 'number' ? (
                <AnimatedCounter value={stat.value} />
              ) : (
                stat.value
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      {stats.pendingPosts > 0 && (
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <svg
              className="w-6 h-6 text-yellow-600"
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
            <h3 className="text-lg font-bold text-gray-800">Attention Required</h3>
          </div>
          <p className="text-gray-700 mb-4">
            You have {stats.pendingPosts} post{stats.pendingPosts !== 1 ? 's' : ''} pending approval.
          </p>
          <button
            onClick={() => {
              // This will be handled by the parent component
              const event = new CustomEvent('changeTab', { detail: 'posts' });
              window.dispatchEvent(event);
            }}
            className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition"
          >
            Review Posts
          </button>
        </div>
      )}

      {/* System Info */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">System Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Platform</p>
            <p className="font-semibold text-gray-800">Mindfulhaven Admin</p>
          </div>
          <div>
            <p className="text-gray-600">Last Updated</p>
            <p className="font-semibold text-gray-800">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
