import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, RefreshCw } from 'lucide-react';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        setLoading(true);
        setError(null);
        
        const [catsRes, productsRes] = await Promise.allSettled([
          productService.getCategories(),
          productService.getFeaturedProducts()
        ]);

        if (catsRes.status === 'fulfilled') {
          setCategories(Array.isArray(catsRes.value) ? catsRes.value : catsRes.value?.data || []);
        }
        
        if (productsRes.status === 'fulfilled') {
          setFeaturedProducts(Array.isArray(productsRes.value) ? productsRes.value : productsRes.value?.data || []);
        }
      } catch (err) {
        setError("Failed to connect to the backend server.");
      } finally {
        setLoading(false);
      }
    }

    fetchHomeData();
  }, []);

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Hero Section */}
      <div style={{
        backgroundColor: '#eceae6',
        padding: '100px 20px',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '52px', fontWeight: '400', color: '#1a1a1a', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
          Sourav Creations
        </h1>
        <p style={{ color: '#555', fontSize: '18px', margin: '0 0 32px 0', fontFamily: 'sans-serif' }}>
          Handcrafted frames, personalized shadow boxes, and custom gifts made with care.
        </p>
        <Link to="/shop">
          <button style={{
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            border: 'none',
            padding: '14px 32px',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '1.5px',
            cursor: 'pointer'
          }}>
            EXPLORE CATALOG
          </button>
        </Link>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'sans-serif', color: '#666' }}>
            <RefreshCw className="animate-spin" style={{ display: 'inline-block', marginBottom: '12px' }} size={24} />
            <p>Loading catalog from backend...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: '4px', marginBottom: '40px', fontFamily: 'sans-serif' }}>
            <p style={{ color: '#d32f2f', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Featured Products */}
        {!loading && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '400', margin: 0, color: '#1a1a1a' }}>
                Featured Collections
              </h2>
              <Link to="/shop" style={{ color: '#666', fontSize: '14px', fontFamily: 'sans-serif', textDecoration: 'none' }}>
                View All &rarr;
              </Link>
            </div>

            {featuredProducts.length === 0 ? (
              <p style={{ fontFamily: 'sans-serif', color: '#888' }}>No products available from backend right now.</p>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '24px'
              }}>
                {featuredProducts.map((product) => (
                  <div key={product._id || product.id} style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #eee',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Link to={`/product/${product._id || product.id}`}>
                      <img
                        src={product.image || '/images/3d-frame.jpeg'}
                        alt={product.name}
                        style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
                      />
                    </Link>

                    <div style={{ padding: '16px', fontFamily: 'sans-serif', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
                        {product.category || 'Handcrafted'}
                      </span>
                      <Link to={`/product/${product._id || product.id}`} style={{ textDecoration: 'none', color: '#111' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 12px 0', fontFamily: 'Georgia, serif' }}>
                          {product.name}
                        </h3>
                      </Link>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>₹{product.price}</span>
                        <button
                          onClick={() => addToCart(product)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '11px',
                            fontWeight: '700',
                            letterSpacing: '0.5px',
                            color: '#111'
                          }}
                        >
                          <ShoppingBag size={14} /> ADD
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
