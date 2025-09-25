import { useEffect, useState } from 'react';
import api from '../services/api';
import SweetCard from '../components/SweetCard';

function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchSweets = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/sweets');
      setSweets(data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(sweet => sweet.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Failed to fetch sweets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (categoryFilter) params.append('category', categoryFilter);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);

      const { data } = await api.get(`/sweets/search?${params.toString()}`);
      setSweets(data);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id) => {
    try {
      await api.post(`/sweets/${id}/purchase`);
      // Refresh the sweets list
      if (searchQuery || categoryFilter || minPrice || maxPrice) {
        handleSearch();
      } else {
        fetchSweets();
      }
    } catch (err) {
      console.error('Purchase failed:', err);
      alert('Purchase failed! Please try again.');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setMinPrice('');
    setMaxPrice('');
    fetchSweets();
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery || categoryFilter || minPrice || maxPrice) {
        handleSearch();
      } else {
        fetchSweets();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, categoryFilter, minPrice, maxPrice]);

  if (loading && sweets.length === 0) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="loading">
            <div>🍬</div>
            <p>Loading delicious sweets...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="container">
        <div className="search-container">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Find Your Sweet Treats
          </h2>
          
          <div className="search-grid">
            <div className="form-group">
              <label className="form-label">Search by name</label>
              <input
                type="text"
                className="search-input"
                placeholder="Search for sweets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="search-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Min Price ($)</label>
              <input
                type="number"
                className="search-input"
                placeholder="0.00"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Max Price ($)</label>
              <input
                type="number"
                className="search-input"
                placeholder="100.00"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          {(searchQuery || categoryFilter || minPrice || maxPrice) && (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button 
                onClick={clearFilters} 
                className="btn btn-outline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="loading">
            <p>Searching...</p>
          </div>
        ) : sweets.length > 0 ? (
          <>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ color: 'var(--text-secondary)' }}>
                {sweets.length} sweet{sweets.length !== 1 ? 's' : ''} found
              </h3>
            </div>
            <div className="grid grid-3">
              {sweets.map(sweet => (
                <SweetCard 
                  key={sweet._id} 
                  sweet={sweet} 
                  onPurchase={handlePurchase} 
                />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No sweets found</h3>
            <p>Try adjusting your search criteria or check back later for new treats!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
