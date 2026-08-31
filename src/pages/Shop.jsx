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
    image: "/images/3d-frame.jpeg"
  },
  {
    id: "2",
    name: "Anniversary Special Frame",
    price: 1499,
    category: "Custom Frames",
    image: "/images/anniversary-frame.jpeg"
  },
  {
    id: "3",
    name: "Cricket Fan Shadow Box",
    price: 999,
    category: "Theme Frames",
    image: "/images/cricket-frame.jpeg"
  },
  {
    id: "4",
    name: "Rakhi Special Gift Set",
    price: 799,
    category: "Festive Gifts",
    image: "/images/rakhi-special.jpeg"
  }
];

export default function Shop() {
  const { addToCart } = useCart();

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{
        backgroundColor: '#111827',
        borderRadius: '16px',
        padding: '40px',
        color: '#ffffff',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 12px 0' }}>Sourav Creations</h1>
        <p style={{ color: '#9ca3af', fontSize: '16px', margin: 0 }}>
          Customized Handcrafted Gifts & Photo Keepsakes
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
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
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
            </Link>

            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase' }}>
                  {product.category}
                </span>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#111827' }}>
                  <h3 style={{ fontSize: '16px', margin: '4px 0 6px 0', fontWeight: '600' }}>
                    {product.name}
                  </h3>
                </Link>
                <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#111827' }}>
                  ?{product.price}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px', gap: '8px' }}>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    backgroundColor: '#111827',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px',
                    fontWeight: '500',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <ShoppingBag size={15} /> Add to Cart
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
                    <Eye size={16} />
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
