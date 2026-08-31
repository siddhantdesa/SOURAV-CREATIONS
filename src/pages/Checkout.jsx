import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { ShieldCheck, Truck, CreditCard } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'COD'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setLoading(true);
    setError(null);

    const orderPayload = {
      items: cartItems.map(item => ({
        product: item.product?._id || item.product?.id || item.id,
        quantity: item.quantity,
        price: item.product?.price || item.price || 0
      })),
      shippingAddress: {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phone: formData.phone
      },
      paymentMethod: formData.paymentMethod,
      totalAmount: cartSubtotal
    };

    try {
      const response = await orderService.createOrder(orderPayload);
      const createdOrder = response.order || response.data || response;
      const orderId = createdOrder._id || createdOrder.id;

      navigate(`/orders${orderId ? `?success=${orderId}` : ''}`);
    } catch (err) {
      setError(err.message || 'Failed to place order. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#f9f9f9', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', color: '#1a1a1a', marginBottom: '16px' }}>Your cart is empty</h2>
        <p style={{ color: '#666', fontFamily: 'sans-serif', marginBottom: '24px' }}>Add some handcrafted items to your cart before proceeding to checkout.</p>
        <Link to="/shop" style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '12px 28px', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>
          EXPLORE CATALOG
        </Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '40px 24px 80px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '400', margin: '0 0 32px 0', color: '#1a1a1a' }}>
          Checkout
        </h1>

        {error && (
          <div style={{ backgroundColor: '#fff3f3', border: '1px solid #ffcdd2', color: '#d32f2f', padding: '16px', borderRadius: '4px', marginBottom: '32px', fontFamily: 'sans-serif' }}>
            {error}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          
          {/* Shipping Form */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #eee', padding: '32px', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', margin: '0 0 24px 0', color: '#1a1a1a' }}>
              Shipping Details
            </h2>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px', color: '#555' }}>Full Name</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} placeholder="Sourav Patel" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px', color: '#555' }}>Email</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} placeholder="you@example.com" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px', color: '#555' }}>Phone</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} placeholder="+91 9876543210" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px', color: '#555' }}>Street Address</label>
                <input type="text" name="address" required value={formData.address} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} placeholder="House/Flat No, Street, Area" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px', color: '#555' }}>City</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px', color: '#555' }}>State</label>
                  <input type="text" name="state" required value={formData.state} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px', color: '#555' }}>Pincode</label>
                  <input type="text" name="zipCode" required value={formData.zipCode} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', color: '#555' }}>Payment Method</label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                    <input type="radio" name="paymentMethod" value="COD" checked={formData.paymentMethod === 'COD'} onChange={handleChange} />
                    Cash on Delivery
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                    <input type="radio" name="paymentMethod" value="ONLINE" checked={formData.paymentMethod === 'ONLINE'} onChange={handleChange} />
                    Online Payment
                  </label>
                </div>
              </div>

            </div>
          </div>

          {/* Order Summary */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #eee', padding: '32px', fontFamily: 'sans-serif', height: 'fit-content' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', margin: '0 0 24px 0', color: '#1a1a1a' }}>
              Order Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', maxHeight: '240px', overflowY: 'auto' }}>
              {cartItems.map(item => (
                <div key={item._id || item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img src={item.product?.image || '/images/3d-frame.jpeg'} alt={item.product?.name} style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                    <div>
                      <p style={{ margin: 0, fontWeight: '600' }}>{item.product?.name || item.name}</p>
                      <span style={{ color: '#777', fontSize: '12px' }}>Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span style={{ fontWeight: '600' }}>₹{(item.product?.price || item.price || 0) * item.quantity}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '16px', color: '#1a1a1a', borderTop: '1px solid #eee', paddingTop: '8px', marginTop: '4px' }}>
                <span>Total</span>
                <span>₹{cartSubtotal}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                border: 'none',
                padding: '16px',
                fontSize: '13px',
                fontWeight: '700',
                letterSpacing: '1px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'PROCESSING ORDER...' : 'PLACE ORDER'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
