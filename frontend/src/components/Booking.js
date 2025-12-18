import React, { useState } from 'react';
import axios from 'axios';

const Booking = ({ show, onBook }) => {
  const [seats, setSeats] = useState([]);

  const handleBook = async () => {
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        showId: show._id,
        seats,
      });
      alert('Booking created ');
      onBook();
    } catch (err) {
      alert('Booking failed ');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1c1c1c, #2b2b2b)',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#ffffff', width: '100%', maxWidth: '420px',padding: '30px', borderRadius: '18px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)', textAlign: 'center',
        }}
      >
        <h2
          style={{
            marginBottom: '25px',
            color: '#1c1c1c',
            fontSize: '26px',
            fontWeight: '700',
          }}
        >
          Book Tickets
        </h2>

        <input
          type="text"
          placeholder="Enter seats (e.g., A1,B2,C3)"
          value={seats.join(',')}
          onChange={(e) => setSeats(e.target.value.split(','))}
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: '15px',
            borderRadius: '10px',
            border: '1.5px solid #ccc',
            outline: 'none',
            marginBottom: '22px',
            transition: 'border 0.3s',
          }}
        />

        <button
          onClick={handleBook}
          style={{
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(135deg, #f84464, #ff5c8a)',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(248, 68, 100, 0.35)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow =
              '0 14px 28px rgba(248, 68, 100, 0.45)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow =
              '0 10px 20px rgba(248, 68, 100, 0.35)';
          }}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Booking;
