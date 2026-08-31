import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, ArrowLeft, RefreshCw, Star, ShieldCheck, Truck } from 'lucide-react';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlistItems } = useCart();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProductData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch primary product details
        const productRes = await productService.getProductById(id);
        const fetchedProduct = productRes?.data || productRes;
        setProduct(fetchedProduct);

        // Fetch related products based on category or general catalog
        try {
          const relatedRes = await productService.getProducts({ category: fetchedProduct?.category });
          const allRelated = Array.isArray(relatedRes) ? relatedRes : relatedRes?.data || [];
          setRelatedProducts(allRelated.filter(p => (p._id || p.id) !== id).slice(0, 4));
        } catch (rErr) {
          console.error("Could not load related products:", rErr);
        }

      } catch (err) {
        setError("Failed to load product details from server.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProductData();
    }
  }, [id]);

  const isWishlisted = product ? wishlistItems.some(item => (item._id || item.id) === (product._id || product.id)) : false;

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '40px 24px 80px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Back Link */}
        <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#555', fontFamily: 'sans-serif', fontSize: '14px', marginBottom: '32px' }}>
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: 'sans-serif', color: '#666' }}>
            <RefreshCw className="animate-spin" style={{ display: 'inline-block', marginBottom: '12px' }} size={28} />
            <p>Loading product details...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: '4px', fontFamily: 'sans-serif' }}>
            <p style={{ color: '#d32f2f', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Product Details Section */}
        {!loading && !error && product && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              backgroundColor: '#ffffff',
              padding: '36px',
              border: '1px solid #eee',
              marginBottom: '60px'
            }}>
              
              {/* Image Container */}
              <div>
                <img
                  src={product.image || '/images/3d-frame.jpeg'}
                  alt={product.name}
                  style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Info Container */}
              <div style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '11px', color: '#888', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {product.category || 'Handcrafted'}
                </span>
                
                <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: '400', margin: '0 0 16px 0', color: '#1a1a1a' }}>
                  {product.name}
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a' }}>
                    â‚¹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span style={{ fontSize: '16px', color: '#999', textDecoration: 'line-through' }}>
                      â‚¹{product.originalPrice}
                    </span>
                  )}
                </div>

                <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
                  {product.description || "Beautifully handcrafted artisanal creation made with precision and care. Perfect for personalized gifting or enhancing home decor."}
                </p>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Quantity:</span>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc' }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }}
                    >
                      -
                    </button>
                    <span style={{ padding: '0 12px', fontSize: '14px', fontWeight: '600' }}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                  <button
                    onClick={() => addToCart(product, quantity)}
                    style={{
                      flex: 1,
                      backgroundColor: '#1a1a1a',
                      color: '#ffffff',
                      border: 'none',
                      padding: '16px',
                      fontSize: '13px',
                      fontWeight: '700',
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <ShoppingBag size={18} /> ADD TO CART
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    style={{
                      padding: '16px',
                      border: '1px solid #ccc',
                      backgroundColor: isWishlisted ? '#fff0f0' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Heart size={18} color={isWishlisted ? '#e53935' : '#444'} fill={isWishlisted ? '#e53935' : 'none'} />
                  </button>
                </div>

                {/* Trust Badges */}
                <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', display: 'flex', gap: '24px', fontSize: '12px', color: '#666' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} /> 100% Quality Assured
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Truck size={16} /> Safe Pan-India Delivery
                  </div>
                </div>

              </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '400', marginBottom: '24px', color: '#1a1a1a' }}>
                  You Might Also Like
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                  gap: '24px'
                }}>
                  {relatedProducts.map((relProduct) => (
                    <div key={relProduct._id || relProduct.id} style={{ backgroundColor: '#ffffff', border: '1px solid #eee' }}>
                      <Link to={`/product/${relProduct._id || relProduct.id}`}>
                        <img
                          src={relProduct.image || '/images/3d-frame.jpeg'}
                          alt={relProduct.name}
                          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                        />
                      </Link>
                      <div style={{ padding: '12px', fontFamily: 'sans-serif' }}>
                        <Link to={`/product/${relProduct._id || relProduct.id}`} style={{ textDecoration: 'none', color: '#111' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: '600', margin: '0 0 8px 0', fontFamily: 'Georgia, serif' }}>
                            {relProduct.name}
                          </h3>
                        </Link>
                        <span style={{ fontSize: '13px', fontWeight: '600' }}>â‚¹{relProduct.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
