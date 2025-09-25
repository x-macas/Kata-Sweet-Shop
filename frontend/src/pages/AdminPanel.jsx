import { useEffect, useState } from 'react';
import api from '../services/api';

function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', price: '', quantity: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchSweets = async () => {
    try {
      const { data } = await api.get('/sweets');
      setSweets(data);
    } catch (err) {
      console.error('Failed to fetch sweets:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (editingId) {
        await api.put(`/sweets/${editingId}`, form);
        setSuccess('Sweet updated successfully!');
        setEditingId(null);
      } else {
        await api.post('/sweets', form);
        setSuccess('Sweet added successfully!');
      }
      
      setForm({ name: '', category: '', price: '', quantity: '' });
      fetchSweets();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (sweet) => {
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString()
    });
    setEditingId(sweet._id);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) return;

    try {
      await api.delete(`/sweets/${id}`);
      setSuccess('Sweet deleted successfully!');
      fetchSweets();
    } catch (err) {
      setError('Failed to delete sweet!');
    }
  };

  const handleRestock = async (id) => {
    const amount = prompt('Enter restock amount:');
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;

    try {
      await api.post(`/sweets/${id}/restock`, { amount: Number(amount) });
      setSuccess('Sweet restocked successfully!');
      fetchSweets();
    } catch (err) {
      setError('Failed to restock sweet!');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', category: '', price: '', quantity: '' });
    setError('');
    setSuccess('');
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="main-content">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Panel 👑</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Manage your sweet inventory
          </p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="admin-form">
          <h2 style={{ marginBottom: '1.5rem' }}>
            {editingId ? 'Edit Sweet' : 'Add New Sweet'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              <div className="form-group">
                <label className="form-label">Sweet Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Chocolate Chip Cookie"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Cookie"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Price ($)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="2.99"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="50"
                  min="0"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Processing...' : editingId ? 'Update Sweet' : 'Add Sweet'}
              </button>
              
              {editingId && (
                <button 
                  type="button" 
                  onClick={cancelEdit}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-list">
          <h2 style={{ padding: '1.5rem', borderBottom: '2px solid var(--border)', margin: 0 }}>
            Current Inventory ({sweets.length} items)
          </h2>
          
          {sweets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📦</div>
              <h3>No sweets in inventory</h3>
              <p>Add your first sweet using the form above!</p>
            </div>
          ) : (
            sweets.map(sweet => (
              <div key={sweet._id} className="admin-item">
                <div className="admin-item-info">
                  <div className="admin-item-name">{sweet.name}</div>
                  <div className="admin-item-details">
                    {sweet.category} • ${sweet.price.toFixed(2)} • {sweet.quantity} in stock
                  </div>
                </div>
                
                <div className="admin-actions">
                  <button
                    onClick={() => handleEdit(sweet)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.875rem' }}
                  >
                    Edit
                  </button>
                  
                  <button
                    onClick={() => handleRestock(sweet._id)}
                    className="btn btn-outline"
                    style={{ fontSize: '0.875rem' }}
                  >
                    Restock
                  </button>
                  
                  <button
                    onClick={() => handleDelete(sweet._id)}
                    className="btn btn-danger"
                    style={{ fontSize: '0.875rem' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
