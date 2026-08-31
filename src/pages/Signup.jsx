import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.signup(formData);
      const token = response.token || response.accessToken || response.data?.token;

      if (token) {
        localStorage.setItem('token', token);
      }

      if (response.user || response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.user || response.data.user));
      }

      navigate('/account');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#f9f9f9', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #eee', padding: '40px', maxWidth: '420px', width: '100%', fontFamily: 'sans-serif' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: '400', margin: '0 0 8px 0', textAlign: 'center', color: '#1a1a1a' }}>
          Create Account
        </h2>
        <p style={{ color: '#666', fontSize: '14px', textAlign: 'center', margin: '0 0 28px 0' }}>
          Join Sourav Creations for personalized handcrafted gifts
        </p>

        {error && (
          <div style={{ backgroundColor: '#fff3f3', border: '1px solid #ffcdd2', color: '#d32f2f', padding: '12px', borderRadius: '4px', fontSize: '13px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', color: '#444' }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
              placeholder="Sourav Patel"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', color: '#444' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
              placeholder="you@example.com"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', color: '#444' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              border: 'none',
              padding: '14px',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '1px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#666' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1a1a1a', fontWeight: '600', textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
