import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, User, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header({ onOpenCart }) {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #eaeaea',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      fontFamily: 'Georgia, serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', color: '#1a1a1a' }}>
          <h1 style={{
            fontSize: '22px',
            fontWeight: '700',
            letterSpacing: '2px',
            margin: 0,
            textTransform: 'uppercase'
          }}>
            SOURAV CREATIONS
          </h1>
        </Link>

        {/* Center Navigation Links */}
        <nav style={{ display: 'flex', gap: '32px', fontFamily: 'sans-serif', fontSize: '13px', letterSpacing: '1px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#1a1a1a', fontWeight: '500' }}>
            HOME
          </Link>
          <Link to="/" style={{ textDecoration: 'none', color: '#666666', fontWeight: '500' }}>
            SHOP
          </Link>
        </nav>

        {/* Right Search Bar & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f4f4f5',
            padding: '6px 14px',
            borderRadius: '20px',
            width: '200px'
          }}>
            <Search size={15} color="#888" style={{ marginRight: '8px' }} />
            <input
              type="text"
              placeholder="Search items..."
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '13px',
                width: '100%',
                fontFamily: 'sans-serif'
              }}
            />
          </div>

          {/* Action Icons */}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a', padding: 0 }}>
            <Heart size={20} />
          </button>

          <button 
            onClick={() => navigate('/profile')} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a', padding: 0 }}
          >
            <User size={20} />
          </button>

          <button
            onClick={onOpenCart}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#1a1a1a',
              position: 'relative',
              padding: 0
            }}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                backgroundColor: '#1a1a1a',
                color: '#fff',
                borderRadius: '50%',
                fontSize: '10px',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'sans-serif'
              }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
