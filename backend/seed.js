require('dotenv').config();
const mongoose = require('mongoose');
const Show = require('./models/Show');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

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

    console.log('Inserting shows:', shows.length);
    const inserted = await Show.insertMany(shows);
    console.log('Inserted shows:', inserted.length);

    await mongoose.disconnect();
    console.log('Seed completed and disconnected');
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

seed();
