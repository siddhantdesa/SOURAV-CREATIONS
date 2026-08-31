import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeNewsletter } from '../../services/newsletterService';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await subscribeNewsletter(email);
      showToast(res.message || 'Subscribed successfully!', 'success');
      setEmail('');
    } catch (err) {
      showToast(err.message || 'Subscription failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-serif tracking-widest text-white uppercase">Sourav Creations</h3>
          <p className="text-sm text-stone-400 max-w-md leading-relaxed">
            Curated artisan craftsmanship. Every item tells a story of heritage, precision, and luxury design.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-stone-400">
            <li><Link to="/shop" className="hover:text-white transition-colors">Catalog</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">Newsletter</h4>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-800 text-white text-sm px-4 py-2 border border-stone-700 focus:outline-none focus:border-stone-500"
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-stone-100 text-stone-900 text-xs font-semibold uppercase tracking-wider py-2 hover:bg-white transition-colors disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-6 text-xs text-stone-500 text-center">
        © {new Date().getFullYear()} Sourav Creations. All rights reserved.
      </div>
    </footer>
  );
}