const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: true,
  },
  seats: [{
    type: String,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);
