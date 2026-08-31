import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import SearchBar from '../common/SearchBar';

export default function Header() {
  const { cartCount } = useCart();
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="font-serif text-2xl font-bold tracking-wider text-stone-900 shrink-0">
          SOURAV CREATIONS
        </Link>

        <nav className="hidden md:flex space-x-8 text-xs uppercase font-semibold tracking-widest text-stone-600">
          <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-stone-900 transition-colors">Shop</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <SearchBar />

          <div className="flex items-center space-x-4 text-stone-700">
            <Link to="/wishlist" aria-label="Wishlist" className="hover:text-stone-900 transition-colors">
              <Heart size={20} />
            </Link>
            <Link to="/profile" aria-label="Account" className="hover:text-stone-900 transition-colors">
              <User size={20} />
            </Link>
            <Link to="/cart" className="relative hover:text-stone-900 transition-colors" aria-label="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
