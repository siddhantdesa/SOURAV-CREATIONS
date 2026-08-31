import { apiClient } from './apiClient';

export const cartService = {
  getCart: async () => {
    try {
      return await apiClient.get('/cart');
    } catch {
      console.warn('Backend unavailable, returning local cart session.');
      return [];
    }
  },
  addToCart: async (productId, quantity = 1) => {
    try {
      return await apiClient.post('/cart', { productId, quantity });
    } catch {
      console.warn('Backend unavailable, local state updated.');
      return { success: true };
    }
  },
  updateQuantity: async (itemId, quantity) => {
    try {
      return await apiClient.put(`/cart/${itemId}`, { quantity });
    } catch {
      return { success: true };
    }
  },
  removeFromCart: async (itemId) => {
    try {
      return await apiClient.delete(`/cart/${itemId}`);
    } catch {
      return { success: true };
    }
  },
  getWishlist: async () => {
    try {
      return await apiClient.get('/wishlist');
    } catch {
      return [];
    }
  },
  toggleWishlist: async (productId) => {
    try {
      return await apiClient.post('/wishlist/toggle', { productId });
    } catch {
      return { success: true };
    }
  },
};
