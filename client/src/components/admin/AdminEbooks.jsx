import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { getAdminEbooks } from '../../services/api';

const AdminEbooks = () => {
  const { user } = useUser();
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('');

  useEffect(() => {
    fetchEbooks();
  }, [search, isActive]);

  const fetchEbooks = async () => {
    try {
      setLoading(true);
      const response = await getAdminEbooks(user.id, { search, isActive });
      setEbooks(response.data.data);
    } catch (err) {
      console.error('Error fetching ebooks:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">E-book Management</h2>
        <Link
          to="/ebooks"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          View E-books Store
        </Link>
      </div>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search ebooks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <select
          value={isActive}
          onChange={(e) => setIsActive(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebooks.map((ebook) => (
            <div key={ebook._id} className="bg-white border border-gray-200 rounded-lg p-4">
              <img
                src={ebook.coverImage}
                alt={ebook.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{ebook.title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {ebook.author}</p>

              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-primary font-bold">{formatCurrency(ebook.price)}</span>
                <span className="text-gray-600">{ebook.credits} credits</span>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-600 mb-3">
                <span>{ebook.downloads} downloads</span>
                <span className={`px-2 py-1 rounded ${ebook.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {ebook.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <Link
                to={`/ebooks/${ebook._id}`}
                target="_blank"
                className="block text-center w-full bg-gray-100 text-gray-800 px-3 py-2 rounded hover:bg-gray-200 transition text-sm"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEbooks;
