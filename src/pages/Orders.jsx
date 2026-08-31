import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { Package, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function Orders() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successOrderId = queryParams.get('success');

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        setError(null);

        const response = await orderService.getOrders();
        const fetchedOrders = Array.isArray(response) ? response : response?.data || response?.orders || [];
        setOrders(fetchedOrders);
      } catch (err) {
        setError('Failed to load orders from backend.');
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '40px 24px 80px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Success Banner */}
        {successOrderId && (
          <div style={{ backgroundColor: '#e8f5e9', border: '1px solid #c8e6c9', color: '#2e7d32', padding: '20px', borderRadius: '4px', marginBottom: '32px', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <CheckCircle2 size={32} />
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700' }}>Order Placed Successfully!</h3>
              <p style={{ margin: 0, fontSize: '13px' }}>Your order reference number is <strong>#{successOrderId}</strong>.</p>
            </div>
          </div>
        )}

        <h1 style={{ fontSize: '36px', fontWeight: '400', margin: '0 0 32px 0', color: '#1a1a1a' }}>
          My Orders
        </h1>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'sans-serif', color: '#666' }}>
            <RefreshCw className="animate-spin" style={{ display: 'inline-block', marginBottom: '12px' }} size={24} />
            <p>Fetching your order history...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: '4px', fontFamily: 'sans-serif' }}>
            <p style={{ color: '#d32f2f', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && orders.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff', border: '1px solid #eee', fontFamily: 'sans-serif' }}>
            <Package size={48} color="#aaa" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', margin: '0 0 8px 0', color: '#333' }}>No orders found</h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>You haven't placed any orders with Sourav Creations yet.</p>
            <Link to="/shop" style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '12px 28px', textDecoration: 'none', fontSize: '12px', fontWeight: '700', letterSpacing: '1px' }}>
              START SHOPPING
            </Link>
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && orders.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {orders.map((order) => (
              <div key={order._id || order.id} style={{ backgroundColor: '#ffffff', border: '1px solid #eee', padding: '24px', fontFamily: 'sans-serif' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '16px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#888', display: 'block' }}>ORDER ID</span>
                    <strong style={{ fontSize: '14px', color: '#1a1a1a' }}>#{order._id || order.id}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#888', display: 'block' }}>STATUS</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: order.status === 'Completed' ? '#2e7d32' : '#e65100' }}>
                      {order.status || 'Processing'}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#888', display: 'block' }}>TOTAL</span>
                    <strong style={{ fontSize: '14px', color: '#1a1a1a' }}>₹{order.totalAmount}</strong>
                  </div>
                </div>

                {/* Items in Order */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(order.items || []).map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <img src={item.product?.image || '/images/3d-frame.jpeg'} alt={item.product?.name} style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                        <span>{item.product?.name || `Product (${item.product})`} × {item.quantity}</span>
                      </div>
                      <span style={{ fontWeight: '600' }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
