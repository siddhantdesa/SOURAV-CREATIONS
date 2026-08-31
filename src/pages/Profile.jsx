import React, { useState } from 'react';
import { User, Package, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('orders');

  const user = {
    name: 'Parth',
    email: 'parth@example.com',
    phone: '+91 9876543210',
    address: '123 Main Street, Sector 4, Pune, Maharashtra'
  };

  const pastOrders = [
    {
      id: 'ORD-9821',
      date: '24 Aug 2026',
      status: 'Delivered',
      total: 1299,
      items: ['3D Photo Shadow Box']
    },
    {
      id: 'ORD-9754',
      date: '10 Jul 2026',
      status: 'Processing',
      total: 499,
      items: ['Personalized Resin Keychain']
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#111827',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Welcome, {user.name}!</h1>
          <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>{user.email}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '30px' }}>
        {/* Sidebar Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'orders' ? '#111827' : 'transparent',
              color: activeTab === 'orders' ? '#ffffff' : '#333333',
              cursor: 'pointer',
              fontWeight: '500',
              textAlign: 'left'
            }}
          >
            <Package size={18} /> My Orders
          </button>

          <button
            onClick={() => setActiveTab('details')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'details' ? '#111827' : 'transparent',
              color: activeTab === 'details' ? '#ffffff' : '#333333',
              cursor: 'pointer',
              fontWeight: '500',
              textAlign: 'left'
            }}
          >
            <User size={18} /> Account Details
          </button>

          <Link to="/" style={{ textDecoration: 'none' }}>
            <button
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#ef4444',
                cursor: 'pointer',
                fontWeight: '500',
                textAlign: 'left',
                marginTop: '16px'
              }}
            >
              <LogOut size={18} /> Logout
            </button>
          </Link>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'orders' && (
            <div>
              <h2 style={{ fontSize: '20px', marginTop: 0, marginBottom: '20px' }}>Order History</h2>
              {pastOrders.map((order) => (
                <div key={order.id} style={{
                  border: '1px solid #eee',
                  borderRadius: '10px',
                  padding: '20px',
                  marginBottom: '16px',
                  backgroundColor: '#fff'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{order.id}</span>
                      <span style={{ fontSize: '13px', color: '#888', marginLeft: '12px' }}>{order.date}</span>
                    </div>
                    <span style={{
                      fontSize: '12px',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      backgroundColor: order.status === 'Delivered' ? '#d1fae5' : '#fef3c7',
                      color: order.status === 'Delivered' ? '#065f46' : '#92400e',
                      fontWeight: 'bold'
                    }}>
                      {order.status}
                    </span>
                  </div>

                  <p style={{ margin: '8px 0', fontSize: '14px', color: '#444' }}>
                    <strong>Items:</strong> {order.items.join(', ')}
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', fontSize: '16px' }}>
                    Total: ₹{order.total}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'details' && (
            <div style={{ border: '1px solid #eee', borderRadius: '10px', padding: '24px', backgroundColor: '#fff' }}>
              <h2 style={{ fontSize: '20px', marginTop: 0, marginBottom: '20px' }}>Personal Details</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#777', fontWeight: 'bold' }}>FULL NAME</label>
                  <p style={{ margin: '4px 0 0 0', fontWeight: '500' }}>{user.name}</p>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#777', fontWeight: 'bold' }}>EMAIL ADDRESS</label>
                  <p style={{ margin: '4px 0 0 0', fontWeight: '500' }}>{user.email}</p>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#777', fontWeight: 'bold' }}>PHONE NUMBER</label>
                  <p style={{ margin: '4px 0 0 0', fontWeight: '500' }}>{user.phone}</p>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#777', fontWeight: 'bold' }}>SAVED ADDRESS</label>
                  <p style={{ margin: '4px 0 0 0', fontWeight: '500' }}>{user.address}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}