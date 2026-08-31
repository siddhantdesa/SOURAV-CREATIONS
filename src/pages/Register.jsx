import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name, email });
    showToast('Account created successfully!');
    navigate('/profile');
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif text-stone-900">Create Account</h1>
        <p className="text-xs text-stone-500">Join Sourav Creations for exclusive offers</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 border border-stone-200 space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-900 mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full p-3 text-xs border border-stone-300 rounded focus:outline-none focus:border-stone-800"
          />
        </div>

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
          Register
        </button>

        <p className="text-center text-xs text-stone-500 pt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-stone-900 font-semibold underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
