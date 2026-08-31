import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: email.split('@')[0], email });
    showToast('Signed in successfully!');
    navigate('/profile');
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif text-stone-900">Sign In</h1>
        <p className="text-xs text-stone-500">Access your Sourav Creations account</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 border border-stone-200 space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-900 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full p-3 text-xs border border-stone-300 rounded focus:outline-none focus:border-stone-800"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-900 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full p-3 text-xs border border-stone-300 rounded focus:outline-none focus:border-stone-800"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-stone-900 text-white py-3 text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors"
        >
          Sign In
        </button>

        <p className="text-center text-xs text-stone-500 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-stone-900 font-semibold underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
