import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get('http://localhost:5000/api/bookings');
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  const handlePay = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}/pay`);
      alert('Payment successful');
      const res = await axios.get('http://localhost:5000/api/bookings');
      setBookings(res.data);
    } catch (err) {
      alert('Payment failed');
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}/cancel`);
      alert('Booking cancelled & refunded ');
      const res = await axios.get('http://localhost:5000/api/bookings');
      setBookings(res.data);
    } catch (err) {
      alert('Cancellation failed ');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1c1c1c, #2b2b2b)',
        padding: '40px 20px',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#ffffff',
          marginBottom: '35px',
          fontSize: '28px',
          fontWeight: '700',
        }}
      >
        My Bookings
      </h2>

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              background: '#ffffff',
              padding: '22px',
              borderRadius: '16px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
            }}
          >
            <p
              style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '10px',
                color: '#1c1c1c',
              }}
            >
              {booking.show.title}
            </p>

            <p
              style={{
                marginBottom: '8px',
                color: '#555',
                fontSize: '14px',
              }}
            >
              Seats: <strong>{booking.seats.join(', ')}</strong>
            </p>

            <p
              style={{
                marginBottom: '18px',
                fontSize: '14px',
                color:
                  booking.paymentStatus === 'paid'
                    ? '#2ecc71'
                    : booking.paymentStatus === 'pending'
                    ? '#f39c12'
                    : '#e74c3c',
                fontWeight: '600',
              }}
            >
              Status: {booking.paymentStatus.toUpperCase()}
            </p>

            {booking.paymentStatus === 'pending' && (
              <button
                onClick={() => handlePay(booking._id)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 8px 18px rgba(46,204,113,0.4)',
                }}
              >
                Pay Now
              </button>
            )}

            {booking.paymentStatus === 'paid' && (
              <button
                onClick={() => handleCancel(booking._id)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #e74c3c, #ff6b6b)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 8px 18px rgba(231,76,60,0.4)',
                }}
              >
                Cancel & Refund
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
