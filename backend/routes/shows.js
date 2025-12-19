const express = require('express');
const Show = require('../models/Show');
const auth = require('../middleware/auth');
const { cache, getCacheKey, invalidateShowsCache, getCacheStats } = require('../config/cache');

const router = express.Router();

// Debug endpoint - must be before /:id route
router.get('/debug/cache', (req, res) => {
  try {
    const keys = cache.keys();
    const stats = cache.getStats();
    const data = {};
    
    keys.forEach(key => {
      data[key] = cache.get(key);
    });
    
    res.json({
      message: 'Cache Statistics',
      keys: keys,
      keyCount: keys.length,
      stats: stats,
      data: data
    });
  } catch (err) {
    console.error('Cache stats error:', err);
    res.status(500).json({ 
      message: 'Error fetching cache stats',
      error: err.message 
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const cacheKey = getCacheKey.allShows();
    const cachedShows = cache.get(cacheKey);
    
    if (cachedShows) {
      console.log('Cache hit: All shows');
      return res.json(cachedShows);
    }
    
    console.log('Cache miss: All shows - Fetching from DB');
    const shows = await Show.find();
    cache.set(cacheKey, shows);
    res.json(shows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cacheKey = getCacheKey.show(req.params.id);
    const cachedShow = cache.get(cacheKey);
    
    if (cachedShow) {
      console.log(`Cache hit: Show ${req.params.id}`);
      return res.json(cachedShow);
    }
    
    console.log(`Cache miss: Show ${req.params.id} - Fetching from DB`);
    const show = await Show.findById(req.params.id);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }
    cache.set(cacheKey, show);
    res.json(show);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  const { title, description, date, time, venue, totalSeats, price } = req.body;
  try {
    const show = new Show({
      title,
      description,
      date,
      time,
      venue,
      totalSeats,
      availableSeats: totalSeats,
      price,
    });
    await show.save();
    invalidateShowsCache();
    res.json(show);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;