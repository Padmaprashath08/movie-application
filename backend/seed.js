require('dotenv').config();
const mongoose = require('mongoose');
const Show = require('./models/Show');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Seeding database...');
    const shows = [
      {
        title: 'Avengers: Endgame',
        description: 'Superhero movie',
        date: new Date('2025-12-20'),
        time: '18:00',
        venue: 'Cinema Hall 1',
        totalSeats: 100,
        availableSeats: 100,
        price: 10,
      },
      {
        title: 'Inception',
        description: 'Sci-fi thriller',
        date: new Date('2025-12-21'),
        time: '20:00',
        venue: 'Cinema Hall 2',
        totalSeats: 50,
        availableSeats: 50,
        price: 12,
      },
    ];
    await Show.insertMany(shows);
    console.log('Seeded successfully');
    process.exit();
  })
  .catch(err => console.log(err));
