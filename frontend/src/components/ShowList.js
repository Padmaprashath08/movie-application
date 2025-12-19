import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowList = ({ onSelectShow }) => {
  const [shows, setShows] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      const res = await axios.get('https://movie-application-pdc5.onrender.com/api/shows');
      setShows(res.data);
    };
    fetchShows();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
        padding: '50px 20px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h2
          style={{
            color: '#ffffff',
            fontSize: '42px',
            fontWeight: '800',
            marginBottom: '12px',
            background: 'linear-gradient(135deg, #f84464, #ff5c8a, #ffa726)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}
        >
          Now Showing
        </h2>
        <p style={{ color: '#aaa', fontSize: '16px', fontWeight: '400' }}>
          Book your favorite movies and enjoy the show
        </p>
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px',
        }}
      >
        {shows.map((show, index) => (
          <div
            key={show._id}
            onMouseEnter={() => setHoveredCard(show._id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              background: 'linear-gradient(145deg, #1e1e2e, #252535)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: hoveredCard === show._id 
                ? '0 25px 50px rgba(248, 68, 100, 0.3), 0 0 0 1px rgba(248, 68, 100, 0.2)'
                : '0 10px 30px rgba(0, 0, 0, 0.5)',
              transform: hoveredCard === show._id ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            <div
              style={{
                position: 'relative',
                padding: '20px 24px 0 24px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: show.availableSeats > 0 
                    ? 'rgba(46, 204, 113, 0.95)' 
                    : 'rgba(231, 76, 60, 0.95)',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                }}
              >
                {show.availableSeats > 0 ? `${show.availableSeats} Seats` : 'Sold Out'}
              </div>
            </div>

            <div style={{ padding: '24px' }}>
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#ffffff',
                  letterSpacing: '-0.3px',
                }}
              >
                {show.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: '#b0b0b0',
                  marginBottom: '18px',
                  lineHeight: '1.6',
                  minHeight: '42px',
                }}
              >
                {show.description}
              </p>

              <div style={{ marginBottom: '18px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '10px',
                    color: '#e0e0e0',
                    fontSize: '14px',
                  }}
                >
                  <span>{new Date(show.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span style={{ color: '#666' }}>•</span>
                  <span>{show.time}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '10px',
                    color: '#e0e0e0',
                    fontSize: '14px',
                  }}
                >
                  <span>{show.venue}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#ffa726',
                    fontSize: '16px',
                    fontWeight: '700',
                  }}
                >
                  <span>₹{show.price}</span>
                </div>
              </div>

              <button
                disabled={show.availableSeats === 0}
                onClick={() => onSelectShow(show)}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: show.availableSeats === 0
                    ? 'linear-gradient(135deg, #555, #666)'
                    : 'linear-gradient(135deg, #f84464, #ff5c8a)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: show.availableSeats === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: show.availableSeats === 0
                    ? 'none'
                    : '0 8px 20px rgba(248, 68, 100, 0.4)',
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === show._id && show.availableSeats > 0 ? 'scale(1.05)' : 'scale(1)',
                  opacity: show.availableSeats === 0 ? 0.5 : 1,
                }}
              >
                {show.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
