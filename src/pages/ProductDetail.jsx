import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Upload, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const productsData = {
  "1": {
    id: "1",
    name: "3D Photo Shadow Box",
    price: 1299,
    description: "A beautifully illuminated 3D shadow box framed with customized layer cutouts and warm LED backlighting. Perfect for anniversaries and birthdays.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80"
  },
  "2": {
    id: "2",
    name: "Personalized Resin Keychain",
    price: 499,
    description: "Handcrafted crystal clear resin keychain embedded with gold foil and custom initial name lettering.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = productsData[id] || productsData["1"];

  const [customText, setCustomText] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [added, setAdded] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      customText,
      uploadedImage: previewImage
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: '#6b7280',
          cursor: 'pointer',
          marginBottom: '24px',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        <ArrowLeft size={16} /> Back to Shop
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', maxHeight: '480px' }}
          />
        </div>

        {/* Product Details & Customization Form */}
        <div>
          <h1 style={{ fontSize: '28px', margin: '0 0 12px 0', color: '#111827' }}>{product.name}</h1>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: '0 0 16px 0' }}>
            ?{product.price}
          </p>
          <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '28px' }}>
            {product.description}
          </p>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 16px 0', color: '#111827' }}>Personalization</h3>

            {/* Custom Text Field */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Custom Name / Text to Print
              </label>
              <input
                type="text"
                placeholder="e.g. Parth & Ananya"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Photo Upload Field */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Upload Photo (Optional)
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                border: '1px dashed #9ca3af',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: '#f9fafb',
                color: '#4b5563',
                fontSize: '14px'
              }}>
                <Upload size={16} /> Choose Photo
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              </label>

              {previewImage && (
                <div style={{ marginTop: '12px' }}>
                  <img
                    src={previewImage}
                    alt="Uploaded preview"
                    style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #ddd' }}
                  />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              width: '100%',
              backgroundColor: added ? '#059669' : '#111827',
              color: '#ffffff',
              border: 'none',
              padding: '14px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'background-color 0.2s'
            }}
          >
            {added ? <Check size={20} /> : <ShoppingBag size={20} />}
            {added ? 'Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
