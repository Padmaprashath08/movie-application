const NodeCache = require('node-cache');

const cache = new NodeCache({
  stdTTL: 300,
  checkperiod: 60,
  useClones: false
});

const CACHE_KEYS = {
  ALL_SHOWS: 'all_shows',
  SHOW_PREFIX: 'show_',
  ALL_BOOKINGS: 'all_bookings',
  BOOKING_PREFIX: 'booking_'
};

const getCacheKey = {
  allShows: () => CACHE_KEYS.ALL_SHOWS,
  show: (id) => `${CACHE_KEYS.SHOW_PREFIX}${id}`,
  allBookings: () => CACHE_KEYS.ALL_BOOKINGS,
  booking: (id) => `${CACHE_KEYS.BOOKING_PREFIX}${id}`
};

const invalidateShowsCache = () => {
  cache.del(CACHE_KEYS.ALL_SHOWS);
  const keys = cache.keys();
  keys.forEach(key => {
    if (key.startsWith(CACHE_KEYS.SHOW_PREFIX)) {
      cache.del(key);
    }
  });
};

const invalidateBookingsCache = () => {
  cache.del(CACHE_KEYS.ALL_BOOKINGS);
  const keys = cache.keys();
  keys.forEach(key => {
    if (key.startsWith(CACHE_KEYS.BOOKING_PREFIX)) {
      cache.del(key);
    }
  });
};

const getCacheStats = () => {
  const keys = cache.keys();
  const stats = cache.getStats();
  
  return {
    keys: keys,
    keyCount: keys.length,
    stats: stats,
    data: keys.reduce((acc, key) => {
      acc[key] = cache.get(key);
      return acc;
    }, {})
  };
};

module.exports = {
  cache,
  getCacheKey,
  invalidateShowsCache,
  invalidateBookingsCache,
  getCacheStats
};
