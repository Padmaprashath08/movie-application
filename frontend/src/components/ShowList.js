import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowList = ({ onSelectShow }) => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const res = await axios.get('http://localhost:5000/api/shows');
      setShows(res.data);
    };
    fetchShows();
  }, []);

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
        Available Shows
      </h2>

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '22px',
        }}
      >
        {shows.map((show) => (
          <div
            key={show._id}
            style={{
              background: '#ffffff',
              padding: '22px',
              borderRadius: '18px',
              boxShadow: '0 18px 40px rgba(0,0,0,0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '10px',
                  color: '#1c1c1c',
                }}
              >
                {show.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: '#555',
                  marginBottom: '10px',
                  lineHeight: '1.5',
                }}
              >
                {show.description}
              </p>

              <p
                style={{
                  fontSize: '14px',
                  marginBottom: '6px',
                  color: '#333',
                }}
              >
                {show.date} | {show.time}
              </p>

              <p
                style={{
                  fontSize: '14px',
                  marginBottom: '6px',
                  color: '#333',
                }}
              >
                Venue: <strong>{show.venue}</strong>
              </p>

              <p
                style={{
                  fontSize: '14px',
                  marginBottom: '6px',
                  color: '#333',
                }}
              >
                Price: <strong>${show.price}</strong>
              </p>

              <p
                style={{
                  fontSize: '14px',
                  marginBottom: '14px',
                  color: show.availableSeats > 0 ? '#27ae60' : '#e74c3c',
                  fontWeight: '600',
                }}
              >
                Available Seats: {show.availableSeats}
              </p>
            </div>

            <button
              disabled={show.availableSeats === 0}
              onClick={() => onSelectShow(show)}
              style={{
                width: '100%',
                padding: '12px',
                background:
                  show.availableSeats === 0
                    ? '#ccc'
                    : 'linear-gradient(135deg, #f84464, #ff5c8a)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '600',
                cursor:
                  show.availableSeats === 0 ? 'not-allowed' : 'pointer',
                boxShadow:
                  show.availableSeats === 0
                    ? 'none'
                    : '0 10px 20px rgba(248, 68, 100, 0.35)',
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
