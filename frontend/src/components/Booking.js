import React, { useState } from 'react';
import axios from 'axios';

const Booking = ({ show, onBook }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 10;

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBook = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    try {
      await axios.post('https://movie-application-pdc5.onrender.com/api/bookings', {
        showId: show._id,
        seats: selectedSeats,
      });
      alert('Booking created successfully! 🎉');
      onBook();
    } catch (err) {
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'rgba(30, 30, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          animation: 'fadeIn 0.6s ease-out',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h2
            style={{
              color: '#ffffff',
              fontSize: '32px',
              fontWeight: '800',
              marginBottom: '8px',
              letterSpacing: '-0.5px',
            }}
          >
            Select Your Seats
          </h2>
          <p style={{ color: '#aaa', fontSize: '16px', marginBottom: '15px' }}>
            {show.title}
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#e0e0e0', fontSize: '14px' }}>
                {new Date(show.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#e0e0e0', fontSize: '14px' }}>{show.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#ffa726', fontSize: '14px', fontWeight: '700' }}>₹{show.price}/seat</span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              padding: '12px 80px',
              borderRadius: '8px 8px 0 0',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '30px',
            }}
          >
            🎬 SCREEN
          </div>
        </div>

        <div style={{ marginBottom: '35px' }}>
          {rows.map((row) => (
            <div
              key={row}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  width: '30px',
                  color: '#aaa',
                  fontSize: '16px',
                  fontWeight: '700',
                  textAlign: 'center',
                }}
              >
                {row}
              </div>
              {Array.from({ length: seatsPerRow }, (_, i) => {
                const seatNumber = `${row}${i + 1}`;
                const isSelected = selectedSeats.includes(seatNumber);
                return (
                  <div
                    key={seatNumber}
                    onClick={() => toggleSeat(seatNumber)}
                    style={{
                      width: '45px',
                      height: '45px',
                      background: isSelected
                        ? 'linear-gradient(135deg, #f84464, #ff5c8a)'
                        : 'rgba(255, 255, 255, 0.1)',
                      border: isSelected
                        ? '2px solid rgba(248, 68, 100, 0.8)'
                        : '2px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px 8px 2px 2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      color: isSelected ? '#fff' : '#888',
                      fontSize: '12px',
                      fontWeight: '600',
                      boxShadow: isSelected
                        ? '0 4px 15px rgba(248, 68, 100, 0.4)'
                        : 'none',
                      transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '25px',
            marginBottom: '30px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
              }}
            />
            <span style={{ color: '#aaa', fontSize: '14px' }}>Available</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                background: 'linear-gradient(135deg, #f84464, #ff5c8a)',
                border: '2px solid rgba(248, 68, 100, 0.8)',
                borderRadius: '6px',
              }}
            />
            <span style={{ color: '#aaa', fontSize: '14px' }}>Selected</span>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '20px',
            borderRadius: '16px',
            marginBottom: '25px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#aaa', fontSize: '15px' }}>Selected Seats:</span>
            <span style={{ color: '#fff', fontSize: '16px', fontWeight: '700' }}>
              {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#aaa', fontSize: '15px' }}>Total Amount:</span>
            <span
              style={{
                color: '#ffa726',
                fontSize: '24px',
                fontWeight: '800',
              }}
            >
              ₹{selectedSeats.length * show.price}
            </span>
          </div>
        </div>

        <button
          onClick={handleBook}
          disabled={selectedSeats.length === 0}
          style={{
            width: '100%',
            padding: '18px',
            background: selectedSeats.length === 0
              ? 'linear-gradient(135deg, #555, #666)'
              : 'linear-gradient(135deg, #f84464, #ff5c8a)',
            color: '#ffffff',
            fontSize: '18px',
            fontWeight: '700',
            border: 'none',
            borderRadius: '14px',
            cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer',
            boxShadow: selectedSeats.length === 0
              ? 'none'
              : '0 12px 24px rgba(248, 68, 100, 0.4)',
            transition: 'all 0.3s ease',
            opacity: selectedSeats.length === 0 ? 0.5 : 1,
          }}
          onMouseOver={(e) => {
            if (selectedSeats.length > 0) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 16px 32px rgba(248, 68, 100, 0.5)';
            }
          }}
          onMouseOut={(e) => {
            if (selectedSeats.length > 0) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 12px 24px rgba(248, 68, 100, 0.4)';
            }
          }}
        >
          {selectedSeats.length === 0 ? 'Select Seats to Continue' : `Confirm Booking (${selectedSeats.length} ${selectedSeats.length === 1 ? 'Seat' : 'Seats'})`}
        </button>
      </div>
    </div>
  );
};

export default Booking;
