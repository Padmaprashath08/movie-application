import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      alert('Registration successful');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(248, 68, 100, 0.15), transparent)',
          borderRadius: '50%',
          top: '-200px',
          right: '-200px',
          filter: 'blur(80px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255, 92, 138, 0.1), transparent)',
          borderRadius: '50%',
          bottom: '-150px',
          left: '-150px',
          filter: 'blur(80px)',
        }}
      />

      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(30, 30, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          width: '100%',
          maxWidth: '450px',
          padding: '45px 40px',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          animation: 'fadeIn 0.6s ease-out',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ marginBottom: '35px' }}>
          <h2
            style={{
              marginBottom: '8px',
              color: '#ffffff',
              fontSize: '32px',
              fontWeight: '800',
              letterSpacing: '-0.5px',
            }}
          >
            Join Us
          </h2>
          <p style={{ color: '#aaa', fontSize: '14px', fontWeight: '400' }}>
            Create your account to get started
          </p>
        </div>

        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            required
            style={{
              width: '100%',
              padding: '16px 20px',
              fontSize: '15px',
              borderRadius: '14px',
              border: focusedField === 'name' 
                ? '2px solid rgba(248, 68, 100, 0.6)' 
                : '2px solid rgba(255, 255, 255, 0.1)',
              outline: 'none',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              transition: 'all 0.3s ease',
              boxShadow: focusedField === 'name' 
                ? '0 0 0 4px rgba(248, 68, 100, 0.1)' 
                : 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            required
            style={{
              width: '100%',
              padding: '16px 20px',
              fontSize: '15px',
              borderRadius: '14px',
              border: focusedField === 'email' 
                ? '2px solid rgba(248, 68, 100, 0.6)' 
                : '2px solid rgba(255, 255, 255, 0.1)',
              outline: 'none',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              transition: 'all 0.3s ease',
              boxShadow: focusedField === 'email' 
                ? '0 0 0 4px rgba(248, 68, 100, 0.1)' 
                : 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: '30px', position: 'relative' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            required
            style={{
              width: '100%',
              padding: '16px 20px',
              fontSize: '15px',
              borderRadius: '14px',
              border: focusedField === 'password' 
                ? '2px solid rgba(248, 68, 100, 0.6)' 
                : '2px solid rgba(255, 255, 255, 0.1)',
              outline: 'none',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              transition: 'all 0.3s ease',
              boxShadow: focusedField === 'password' 
                ? '0 0 0 4px rgba(248, 68, 100, 0.1)' 
                : 'none',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #f84464, #ff5c8a)',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '700',
            border: 'none',
            borderRadius: '14px',
            cursor: 'pointer',
            boxShadow: '0 12px 24px rgba(248, 68, 100, 0.4)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 16px 32px rgba(248, 68, 100, 0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 12px 24px rgba(248, 68, 100, 0.4)';
          }}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
