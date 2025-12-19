import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
  const [bookings, setBookings] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get('https://movie-application-pdc5.onrender.com/api/bookings');
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  const handlePay = async (id) => {
    try {
      await axios.put(`https://movie-application-pdc5.onrender.com/api/bookings/${id}/pay`);
      alert('Payment successful! 🎉');
      const res = await axios.get('https://movie-application-pdc5.onrender.com/api/bookings');
      setBookings(res.data);
    } catch (err) {
      alert('Payment failed. Please try again.');
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`https://movie-application-pdc5.onrender.com/api/bookings/${id}/cancel`);
      alert('Booking cancelled & refunded successfully! 💰');
      const res = await axios.get('https://movie-application-pdc5.onrender.com/api/bookings');
      setBookings(res.data);
    } catch (err) {
      alert('Cancellation failed. Please try again.');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: {
        bg: 'linear-gradient(135deg, #2ecc71, #27ae60)',
        icon: '✓',
        text: 'PAID',
      },
      pending: {
        bg: 'linear-gradient(135deg, #f39c12, #e67e22)',
        icon: '⏳',
        text: 'PENDING',
      },
      cancelled: {
        bg: 'linear-gradient(135deg, #e74c3c, #c0392b)',
        icon: '✕',
        text: 'CANCELLED',
      },
    };
    return statusConfig[status] || statusConfig.pending;
  };

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
          My Bookings
        </h2>
        <p style={{ color: '#aaa', fontSize: '16px', fontWeight: '400' }}>
          Manage your movie tickets and bookings
        </p>
      </div>

      {bookings.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          <div style={{ fontSize: '80px', marginBottom: '20px' }}></div>
          <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '12px' }}>
            No Bookings Yet
          </h3>
          <p style={{ color: '#aaa', fontSize: '16px' }}>
            Start booking your favorite movies now!
          </p>
        </div>
      ) : (
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '25px',
          }}
        >
          {bookings.map((booking, index) => {
            const statusBadge = getStatusBadge(booking.paymentStatus);
            return (
              <div
                key={booking._id}
                onMouseEnter={() => setHoveredCard(booking._id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'linear-gradient(145deg, #1e1e2e, #252535)',
                  padding: '28px',
                  borderRadius: '20px',
                  boxShadow: hoveredCard === booking._id
                    ? '0 20px 40px rgba(248, 68, 100, 0.2), 0 0 0 1px rgba(248, 68, 100, 0.2)'
                    : '0 10px 30px rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: hoveredCard === booking._id ? 'translateY(-5px)' : 'translateY(0)',
                  animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: statusBadge.bg,
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <span>{statusBadge.text}</span>
                </div>

                <div style={{ marginBottom: '20px', paddingRight: '100px' }}>
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: '700',
                      marginBottom: '12px',
                      color: '#ffffff',
                      letterSpacing: '-0.3px',
                    }}
                  >
                    {booking.show.title}
                  </h3>

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
                    <span>
                      {new Date(booking.show.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span style={{ color: '#666' }}>•</span>
                    <span>{booking.show.time}</span>
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
                    <span>{booking.show.venue}</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px',
                      color: '#e0e0e0',
                      fontSize: '14px',
                    }}
                  >
                    <span>
                      <strong style={{ color: '#fff' }}>
                        {booking.seats.join(', ')}
                      </strong>
                    </span>
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
                    <span>₹{booking.totalAmount}</span>
                  </div>
                </div>

                {booking.paymentStatus === 'pending' && (
                  <button
                    onClick={() => handlePay(booking._id)}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: '0 8px 20px rgba(46, 204, 113, 0.4)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 28px rgba(46, 204, 113, 0.5)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 20px rgba(46, 204, 113, 0.4)';
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
                      padding: '14px',
                      background: 'linear-gradient(135deg, #e74c3c, #ff6b6b)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: '0 8px 20px rgba(231, 76, 60, 0.4)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 28px rgba(231, 76, 60, 0.5)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 20px rgba(231, 76, 60, 0.4)';
                    }}
                  >
                    Cancel & Refund
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Payment;
