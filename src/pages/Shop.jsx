import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, RefreshCw, Search } from 'lucide-react';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';

export default function Shop() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadShopData() {
      try {
        setLoading(true);
        setError(null);

        const [productsRes, categoriesRes] = await Promise.allSettled([
          productService.getProducts(),
          productService.getCategories()
        ]);

        if (productsRes.status === 'fulfilled') {
          const fetchedProducts = Array.isArray(productsRes.value)
            ? productsRes.value
            : productsRes.value?.data || [];
          setProducts(fetchedProducts);
        }

        if (categoriesRes.status === 'fulfilled') {
          const fetchedCategories = Array.isArray(categoriesRes.value)
            ? categoriesRes.value
            : categoriesRes.value?.data || [];
          
          const catNames = fetchedCategories.map(c => typeof c === 'string' ? c : c.name);
          setCategories(["All", ...catNames]);
        }
      } catch (err) {
        setError("Failed to load products from server.");
      } finally {
        setLoading(false);
      }
    }

    loadShopData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Hero Section */}
      <div style={{
        backgroundColor: '#eceae6',
        padding: '80px 20px',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: '400', color: '#1a1a1a', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
          Handcrafted Elegance
        </h1>
        <p style={{ color: '#555', fontSize: '16px', margin: '0 0 28px 0', fontFamily: 'sans-serif' }}>
          Discover unique, artisanal creations crafted with dedication and natural materials.
        </p>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Search Bar */}
        <div style={{ maxWidth: '500px', margin: '0 auto 32px auto', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: '24px',
              border: '1px solid #ccc',
              fontSize: '14px',
              fontFamily: 'sans-serif',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
        </div>

        {/* Category Filter Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '40px',
          fontFamily: 'sans-serif'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                backgroundColor: selectedCategory === category ? '#1a1a1a' : '#ffffff',
                color: selectedCategory === category ? '#ffffff' : '#444444',
                border: '1px solid #e5e5e5',
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'sans-serif', color: '#666' }}>
            <RefreshCw className="animate-spin" style={{ display: 'inline-block', marginBottom: '12px' }} size={24} />
            <p>Fetching shop items...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: '4px', marginBottom: '40px', fontFamily: 'sans-serif' }}>
            <p style={{ color: '#d32f2f', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '400', margin: 0, color: '#1a1a1a' }}>
                {selectedCategory === "All" ? "Catalog" : selectedCategory}
              </h2>
              <span style={{ fontSize: '13px', color: '#666', fontFamily: 'sans-serif' }}>
                Showing {filteredProducts.length} items
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'sans-serif', color: '#888' }}>
                <p>No products match your criteria.</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '24px'
              }}>
                {filteredProducts.map((product) => (
                  <div key={product._id || product.id} style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #eee',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <button style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 2,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <Heart size={16} color="#444" />
                    </button>

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
