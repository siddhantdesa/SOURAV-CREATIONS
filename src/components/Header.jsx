import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartItems, setIsCartOpen } = useCart();
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #eaeaea',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 24px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', color: '#111827' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            SOURAV CREATIONS
          </h1>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#374151', fontWeight: '500', fontSize: '15px' }}>
            Home
          </Link>
          <Link to="/" style={{ textDecoration: 'none', color: '#374151', fontWeight: '500', fontSize: '15px' }}>
            Shop
          </Link>
        </nav>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f3f4f6',
          borderRadius: '20px',
          padding: '6px 14px',
          width: '240px'
        }}>
          <Search size={16} color="#6b7280" />
          <input
            type="text"
            placeholder="Search items..."
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              outline: 'none',
              marginLeft: '8px',
              width: '100%',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <Link to="/profile" style={{ color: '#374151', display: 'flex', alignItems: 'center' }}>
            <User size={22} />
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              padding: 0
            }}
          >
            <ShoppingBag size={22} color="#374151" />
            {totalItemsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 'bold',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
