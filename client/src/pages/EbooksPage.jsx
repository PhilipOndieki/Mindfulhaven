import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { getEbooks, getEbookCategories } from '../services/api';

const EbooksPage = () => {
  const { user } = useUser();
  const [ebooks, setEbooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('-createdAt');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchEbooks();
  }, [currentPage, searchTerm, selectedCategory, sortBy]);

  const fetchCategories = async () => {
    try {
      const response = await getEbookCategories();
      setCategories(response.data.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchEbooks = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 12,
        search: searchTerm,
        category: selectedCategory,
        sort: sortBy
      };

      const response = await getEbooks(params);
      setEbooks(response.data.data);
      setTotalPages(response.data.pagination.pages);
      setError(null);
    } catch (err) {
      setError('Failed to load e-books. Please try again later.');
      console.error('Error fetching ebooks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchEbooks();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">E-book Library</h1>
        <p className="text-gray-600">
          Discover and purchase mental wellness e-books from our curated collection
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search e-books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Sort Filter */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="-downloads">Most Popular</option>
            <option value="title">Title: A-Z</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading e-books...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* E-books Grid */}
      {!loading && !error && (
        <>
          {ebooks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No e-books found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {ebooks.map((ebook) => (
                <Link
                  key={ebook._id}
                  to={`/ebooks/${ebook._id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-[3/4] bg-gray-200">
                    <img
                      src={ebook.coverImage}
                      alt={ebook.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                      }}
                    />
                    {ebook.isPremiumOnly && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Premium+
                      </div>
                    )}
                  </div>

                  {/* E-book Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 line-clamp-2 text-gray-800">
                      {ebook.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{ebook.author}</p>

                    {/* Category & Format */}
                    <div className="flex items-center gap-2 mb-2 text-xs">
                      <span className="bg-secondary text-primary px-2 py-1 rounded">
                        {ebook.category}
                      </span>
                      <span className="text-gray-500">{ebook.format}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span>{ebook.pages} pages</span>
                      <span>•</span>
                      <span>{ebook.downloads} downloads</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(ebook.price)}
                        </p>
                        {ebook.credits > 0 && (
                          <p className="text-xs text-gray-500">
                            or {ebook.credits} credits
                          </p>
                        )}
                      </div>
                      <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition text-sm">
                        View
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === index + 1
                        ? 'bg-primary text-white'
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EbooksPage;
