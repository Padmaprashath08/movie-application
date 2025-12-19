const express = require('express');
const Booking = require('../models/Booking');
const Show = require('../models/Show');
const { cache, getCacheKey, invalidateBookingsCache, invalidateShowsCache } = require('../config/cache');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cacheKey = getCacheKey.allBookings();
    const cachedBookings = cache.get(cacheKey);
    
    if (cachedBookings) {
      console.log('Cache hit: All bookings');
      return res.json(cachedBookings);
    }
    
    console.log('Cache miss: All bookings - Fetching from DB');
    const bookings = await Booking.find().populate('show');
    cache.set(cacheKey, bookings);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { showId, seats } = req.body;
  try {
    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }
    if (seats.length > show.availableSeats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }
    const totalAmount = seats.length * show.price;
    const booking = new Booking({
      show: showId,
      seats,
      totalAmount,
    });
    await booking.save();
    show.availableSeats -= seats.length;
    await show.save();
    invalidateBookingsCache();
    invalidateShowsCache();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.paymentStatus === 'paid') {
      booking.paymentStatus = 'cancelled';
      await booking.save();
      const show = await Show.findById(booking.show);
      show.availableSeats += booking.seats.length;
      await show.save();
      invalidateBookingsCache();
      invalidateShowsCache();
      res.json({ message: 'Booking cancelled and refunded' });
    } else {
      res.status(400).json({ message: 'Cannot cancel unpaid booking' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/pay', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    booking.paymentStatus = 'paid';
    await booking.save();
    invalidateBookingsCache();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
