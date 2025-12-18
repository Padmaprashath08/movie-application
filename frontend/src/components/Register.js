import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        background: 'linear-gradient(135deg, #1c1c1c, #2b2b2b)',
        padding: '20px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '420px',
          padding: '30px',
          borderRadius: '18px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
          textAlign: 'center',
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
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: '15px',
            borderRadius: '10px',
            border: '1.5px solid #ccc',
            outline: 'none',
            marginBottom: '16px',
          }}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: '15px',
            borderRadius: '10px',
            border: '1.5px solid #ccc',
            outline: 'none',
            marginBottom: '16px',
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: '15px',
            borderRadius: '10px',
            border: '1.5px solid #ccc',
            outline: 'none',
            marginBottom: '22px',
          }}
        />

        <button
          type="submit"
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
