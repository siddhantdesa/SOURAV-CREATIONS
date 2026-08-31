import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden text-stone-700 hover:text-stone-900 p-1"
          aria-label="Open Menu"
        >
          <Menu size={22} />
        </button>

        {/* Brand Logo */}
        <Link to="/" className="text-xl md:text-2xl font-serif tracking-widest text-stone-900 font-semibold uppercase">
          Sourav Creations
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-stone-600">
          <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-stone-900 transition-colors">Shop All</Link>
          <Link to="/shop?category=Ceramics" className="hover:text-stone-900 transition-colors">Ceramics</Link>
          <Link to="/shop?category=Textiles" className="hover:text-stone-900 transition-colors">Textiles</Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center space-x-5 text-stone-700">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:text-stone-900 transition-colors p-1"
            aria-label="Toggle Search"
          >
            <Search size={20} />
          </button>

          <Link to="/wishlist" className="relative hover:text-stone-900 transition-colors p-1" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to={user ? "/profile" : "/login"} className="hover:text-stone-900 transition-colors p-1" aria-label="Account">
            <User size={20} />
          </Link>

          <Link to="/cart" className="relative hover:text-stone-900 transition-colors p-1" aria-label="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-700 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* --- Search Bar Overlay --- */}
      {isSearchOpen && (
        <div className="border-t border-stone-200 bg-white px-6 py-4 shadow-inner">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center space-x-3">
            <Search size={18} className="text-stone-400" />
            <input
              type="text"
              placeholder="Search handcrafted items (e.g. Vase, Linen, Brass)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm py-1 bg-transparent focus:outline-none text-stone-900"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-stone-400 hover:text-stone-800 p-1"
            >
              <X size={18} />
            </button>
          </form>
        </div>
      )}

      {/* --- Mobile Navigation Drawer --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Menu Panel */}
          <div className="relative z-10 w-4/5 max-w-sm bg-stone-50 h-full p-6 space-y-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <span className="font-serif text-lg tracking-wider text-stone-900 uppercase">Navigation</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-stone-500 hover:text-stone-900 p-1">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col space-y-4 text-sm font-semibold uppercase tracking-wider text-stone-700">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-stone-900">Home</Link>
                <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="hover:text-stone-900">Shop All</Link>
                <Link to="/shop?category=Ceramics" onClick={() => setIsMenuOpen(false)} className="hover:text-stone-900">Ceramics</Link>
                <Link to="/shop?category=Textiles" onClick={() => setIsMenuOpen(false)} className="hover:text-stone-900">Textiles</Link>
                <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="hover:text-stone-900">Wishlist ({wishlist.length})</Link>
              </nav>
            </div>

            <div className="border-t border-stone-200 pt-6">
              <Link
                to={user ? "/profile" : "/login"}
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider py-3 flex items-center justify-center space-x-2"
              >
                <User size={16} />
                <span>{user ? "My Account" : "Sign In / Register"}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
