import { apiClient } from './apiClient';

export const orderService = {
  createOrder: async (orderData) => {
    try {
      return await apiClient.post('/orders', orderData);
    } catch (err) {
      console.warn('Backend unavailable, creating local mock order.');
      const mockOrder = {
        _id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        items: orderData.items || [],
        totalAmount: orderData.totalAmount || 0,
        status: 'Processing',
        createdAt: new Date().toISOString()
      };
      const existingOrders = JSON.parse(localStorage.getItem('mock_orders') || '[]');
      localStorage.setItem('mock_orders', JSON.stringify([mockOrder, ...existingOrders]));
      return mockOrder;
    }
  },
  getOrders: async () => {
    try {
      return await apiClient.get('/orders');
    } catch {
      console.warn('Backend unavailable, returning local mock orders.');
      return JSON.parse(localStorage.getItem('mock_orders') || '[]');
    }
  },
  getOrderById: async (id) => {
    try {
      return await apiClient.get(`/orders/${id}`);
    } catch {
      const existingOrders = JSON.parse(localStorage.getItem('mock_orders') || '[]');
      return existingOrders.find(o => o._id === id) || existingOrders[0];
    }
  },
};
