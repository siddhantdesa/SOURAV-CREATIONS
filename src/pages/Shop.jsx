import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

const products = [
  {
    id: "1",
    name: "3D Photo Shadow Box",
    price: 1299,
    category: "Shadow Boxes",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    name: "Personalized Resin Keychain",
    price: 499,
    category: "Keychains",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    name: "Custom LED Name Lamp",
    price: 899,
    category: "Lamps",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "4",
    name: "Handcrafted Wooden Frame",
    price: 799,
    category: "Frames",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80"
  }
];

export default function Shop() {
  const { addToCart } = useCart();

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      {/* Hero Banner */}
      <div style={{
        backgroundColor: '#111827',
        borderRadius: '16px',
        padding: '48px 32px',
        color: '#ffffff',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 12px 0' }}>Handcrafted Personalized Gifts</h1>
        <p style={{ color: '#9ca3af', fontSize: '16px', margin: 0 }}>
          Make every moment special with customized shadow boxes, keychains, and lamps.
        </p>
      </div>

      {/* Product Grid */}
      <h2 style={{ fontSize: '22px', margin: '0 0 24px 0', color: '#111827' }}>Featured Products</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '24px'
      }}>
        {products.map((product) => (
          <div key={product.id} style={{
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Link to={`/product/${product.id}`} style={{ overflow: 'hidden', display: 'block' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.2s'
                }}
              />
            </Link>

            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {product.category}
                </span>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#111827' }}>
                  <h3 style={{ fontSize: '16px', margin: '4px 0 8px 0', fontWeight: '600' }}>
                    {product.name}
                  </h3>
                </Link>
                <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#111827' }}>
                  ?{product.price}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 44px', gap: '8px' }}>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    backgroundColor: '#111827',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px',
                    fontWeight: '500',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>

                <Link to={`/product/${product.id}`}>
                  <button style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#374151'
                  }}>
                    <Eye size={18} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
