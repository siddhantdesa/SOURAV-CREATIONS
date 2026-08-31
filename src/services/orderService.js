import { CONFIG, sleep } from './config';
import { apiClient } from './apiClient';
import { MOCK_ORDERS } from './mock/mockOrders';

export const orderService = {
  async getOrders() {
    if (CONFIG.USE_MOCK) {
      await sleep();
      const localOrders = JSON.parse(localStorage.getItem('sc_orders') || '[]');
      return [...localOrders, ...MOCK_ORDERS];
    }
    return apiClient('/orders');
  },

  async getOrderById(id) {
    if (CONFIG.USE_MOCK) {
      await sleep();
      const allOrders = await this.getOrders();
      const order = allOrders.find(o => o.id === id);
      if (!order) throw new Error('Order not found');
      return order;
    }
    return apiClient(`/orders/${id}`);
  },

  async createOrder(orderPayload) {
    if (CONFIG.USE_MOCK) {
      await sleep();
      const newOrder = {
        id: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
        date: new Date().toISOString(),
        status: 'Processing',
        ...orderPayload
      };
      
      const localOrders = JSON.parse(localStorage.getItem('sc_orders') || '[]');
      localOrders.unshift(newOrder);
      localStorage.setItem('sc_orders', JSON.stringify(localOrders));
      
      return newOrder;
    }
    return apiClient('/orders', { method: 'POST', body: JSON.stringify(orderPayload) });
  }
};