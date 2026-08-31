import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isPlaced, setIsPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setIsPlaced(true);
    clearCart();
  };

  if (isPlaced) {
    return (
      <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
        <CheckCircle size={64} color="#059669" style={{ marginBottom: '16px' }} />
        <h1 style={{ fontSize: '28px', color: '#111827', margin: '0 0 8px 0' }}>Order Placed Successfully!</h1>
        <p style={{ color: '#4b5563', fontSize: '15px', marginBottom: '24px' }}>
          Thank you for shopping with Sourav Creations. We will send updates to your email.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#111827',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '24px', margin: '0 0 24px 0', color: '#111827' }}>Checkout</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '36px' }}>
        {/* Shipping & Payment Info */}
        <div>
          <h2 style={{ fontSize: '18px', margin: '0 0 16px 0', color: '#111827' }}>Shipping Details</h2>
          <div style={{ display: 'grid', gap: '14px', marginBottom: '32px' }}>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
            </div>
            <input
              type="text"
              placeholder="Street Address"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <input
                type="text"
                placeholder="City"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
              <input
                type="text"
                placeholder="PIN Code"
                required
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
            </div>
          </div>

          <h2 style={{ fontSize: '18px', margin: '0 0 16px 0', color: '#111827' }}>Payment Method</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px',
              border: paymentMethod === 'upi' ? '2px solid #111827' : '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
              <span style={{ fontWeight: '500', fontSize: '14px' }}>UPI (GPay / PhonePe / Paytm)</span>
            </label>

            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px',
              border: paymentMethod === 'cod' ? '2px solid #111827' : '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
              <span style={{ fontWeight: '500', fontSize: '14px' }}>Cash on Delivery (COD)</span>
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', backgroundColor: '#f9fafb', height: 'fit-content' }}>
          <h2 style={{ fontSize: '18px', margin: '0 0 16px 0', color: '#111827' }}>Order Summary</h2>

          {cartItems.length === 0 ? (
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                  <div>
                    <span style={{ fontWeight: '500' }}>{item.name}</span>
                    <span style={{ color: '#6b7280', fontSize: '12px', display: 'block' }}>Qty: {item.quantity}</span>
                  </div>
                  <span style={{ fontWeight: '600' }}>?{item.price * item.quantity}</span>
                </div>
              ))}

              <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '16px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span>Subtotal</span>
                <span>?{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '16px' }}>
                <span>Delivery Charge</span>
                <span>?{shipping}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>
                <span>Total</span>
                <span>?{total}</span>
              </div>

              <button
                type="submit"
                disabled={cartItems.length === 0}
                style={{
                  width: '100%',
                  backgroundColor: cartItems.length === 0 ? '#9ca3af' : '#111827',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
