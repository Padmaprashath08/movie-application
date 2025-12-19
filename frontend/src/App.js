import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import ShowList from './components/ShowList';
import Booking from './components/Booking';
import Payment from './components/Payment';

function AppContent() {
  const { user, logout } = useAuth();
  const [authMode, setAuthMode] = useState('login');
  const [currentView, setCurrentView] = useState('shows');
  const [selectedShow, setSelectedShow] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  if (!user) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(248, 68, 100, 0.1), transparent)',
            borderRadius: '50%',
            top: '-250px',
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'blur(100px)',
          }}
        />
        
        {authMode === 'login' ? (
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Login />
            <p
              style={{
                textAlign: 'center',
                color: '#aaa',
                marginTop: '25px',
                fontSize: '15px',
              }}
            >
              Don't have an account?{' '}
              <button
                onClick={() => setAuthMode('register')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f84464',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '15px',
                  textDecoration: 'underline',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#ff5c8a')}
                onMouseOut={(e) => (e.target.style.color = '#f84464')}
              >
                Create Account
              </button>
            </p>
          </div>
        ) : (
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Register />
            <p
              style={{
                textAlign: 'center',
                color: '#aaa',
                marginTop: '25px',
                fontSize: '15px',
              }}
            >
              Already have an account?{' '}
              <button
                onClick={() => setAuthMode('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f84464',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '15px',
                  textDecoration: 'underline',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#ff5c8a')}
                onMouseOut={(e) => (e.target.style.color = '#f84464')}
              >
                Sign In
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      }}
    >
      <div
        style={{
          background: 'rgba(30, 30, 46, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '18px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #f84464, #ff5c8a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          BookMyShow
        </h2>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={() => {
              setCurrentView('shows');
              setSelectedShow(null);
            }}
            onMouseEnter={() => setHoveredButton('shows')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              padding: '12px 24px',
              background:
                currentView === 'shows'
                  ? 'linear-gradient(135deg, #f84464, #ff5c8a)'
                  : 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              border:
                currentView === 'shows'
                  ? 'none'
                  : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow:
                currentView === 'shows'
                  ? '0 8px 20px rgba(248, 68, 100, 0.4)'
                  : 'none',
              transform:
                hoveredButton === 'shows' && currentView !== 'shows'
                  ? 'translateY(-2px)'
                  : 'translateY(0)',
            }}
          >
            Shows
          </button>
          <button
            onClick={() => setCurrentView('payment')}
            onMouseEnter={() => setHoveredButton('bookings')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              padding: '12px 24px',
              background:
                currentView === 'payment'
                  ? 'linear-gradient(135deg, #f84464, #ff5c8a)'
                  : 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              border:
                currentView === 'payment'
                  ? 'none'
                  : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow:
                currentView === 'payment'
                  ? '0 8px 20px rgba(248, 68, 100, 0.4)'
                  : 'none',
              transform:
                hoveredButton === 'bookings' && currentView !== 'payment'
                  ? 'translateY(-2px)'
                  : 'translateY(0)',
            }}
          >
            My Bookings
          </button>
          <button
            onClick={logout}
            onMouseEnter={() => setHoveredButton('logout')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #e74c3c, #ff6b6b)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(231, 76, 60, 0.4)',
              transition: 'all 0.3s ease',
              transform:
                hoveredButton === 'logout'
                  ? 'translateY(-2px)'
                  : 'translateY(0)',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div>
        {currentView === 'shows' && (
          <ShowList
            onSelectShow={(show) => {
              setSelectedShow(show);
              setCurrentView('booking');
            }}
          />
        )}
        {currentView === 'booking' && selectedShow && (
          <Booking show={selectedShow} onBook={() => setCurrentView('payment')} />
        )}
        {currentView === 'payment' && <Payment />}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
