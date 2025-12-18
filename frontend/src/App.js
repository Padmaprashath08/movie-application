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

  if (!user) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1c1c1c, #2b2b2b)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          padding: '20px',
        }}
      >
        <h1 style={{ color: '#fff' }}>🎬 BookMyShow</h1>
        {authMode === 'login' ? (
          <div>
            <Login />
            <p style={{ color: '#fff' }}>Don't have an account? <button onClick={() => setAuthMode('register')} style={{ color: '#f84464' }}>Register</button></p>
          </div>
        ) : (
          <div>
            <Register />
            <p style={{ color: '#fff' }}>Already have an account? <button onClick={() => setAuthMode('login')} style={{ color: '#f84464' }}>Login</button></p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1c1c1c, #2b2b2b)',
      }}
    >
      {/* NAVBAR */}
      <div
        style={{
          background: '#ffffff',
          padding: '16px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <h2
          style={{
            margin: 0,
            color: '#f84464',
            fontWeight: '800',
          }}
        >
          🎬 BookMyShow
        </h2>

        <div>
          <button
            onClick={() => { setCurrentView('shows'); setSelectedShow(null); }}
            style={{
              padding: '10px 18px',
              background: currentView === 'shows' ? '#f84464' : '#ccc',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Shows
          </button>
          <button
            onClick={() => setCurrentView('payment')}
            style={{
              padding: '10px 18px',
              background: currentView === 'payment' ? '#f84464' : '#ccc',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            My Bookings
          </button>
          <button
            onClick={logout}
            style={{
              padding: '10px 18px',
              background: 'linear-gradient(135deg, #e74c3c, #ff6b6b)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 8px 18px rgba(231,76,60,0.4)',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div
        style={{
          padding: '30px 20px',
        }}
      >
        {currentView === 'shows' && (
          <ShowList onSelectShow={(show) => { setSelectedShow(show); setCurrentView('booking'); }} />
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
