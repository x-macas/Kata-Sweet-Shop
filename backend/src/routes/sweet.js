const express = require('express');
const router = express.Router();
const Sweet = require('../models/Sweet');
const { auth, adminOnly } = require('../middleware/auth');

// POST /api/sweets (protected, admin only)
router.post('/', auth, adminOnly, async (req, res) => {
  const { name, category, price, quantity } = req.body;
  
  if (!name || !category || !price || quantity === undefined) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const sweet = await Sweet.create({ name, category, price, quantity });
    res.status(201).json(sweet);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Sweet name already exists' });
    }
    console.error('Create sweet error:', err);
    res.status(400).json({ message: err.message });
  }
});

// GET /api/sweets
router.get('/', async (req, res) => {
  try {
    const sweets = await Sweet.find({}).sort({ createdAt: -1 });
    res.json(sweets);
  } catch (err) {
    console.error('Fetch sweets error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/sweets/search?q=&category=&minPrice=&maxPrice=
router.get('/search', async (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;
  
  try {
    const filter = {};
    
    if (q) filter.name = { $regex: q, $options: 'i' };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter).sort({ createdAt: -1 });
    res.json(sweets);
  } catch (err) {
    console.error('Search sweets error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/sweets/:id (protected, admin only)
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const updated = await Sweet.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    
    res.json(updated);
  } catch (err) {
    console.error('Update sweet error:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/sweets/:id (protected, admin only)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const deleted = await Sweet.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    
    res.json({ message: 'Sweet deleted successfully' });
  } catch (err) {
    console.error('Delete sweet error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/sweets/:id/purchase (protected)
router.post('/:id/purchase', auth, async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    
    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: 'Out of stock' });
    }

    sweet.quantity -= 1;
    await sweet.save();
    
    res.json(sweet);
  } catch (err) {
    console.error('Purchase sweet error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/sweets/:id/restock (protected, admin only)
router.post('/:id/restock', auth, adminOnly, async (req, res) => {
  const { amount } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Valid amount required' });
  }

  try {
    const sweet = await Sweet.findById(req.params.id);
    
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    sweet.quantity += Number(amount);
    await sweet.save();
    
    res.json(sweet);
  } catch (err) {
    console.error('Restock sweet error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
