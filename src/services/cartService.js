import { CONFIG, sleep } from './config';

export const cartService = {
  getCart() {
    try {
      const stored = localStorage.getItem('sc_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  async syncCart(cartItems) {
    if (CONFIG.USE_MOCK) {
      await sleep(100);
      localStorage.setItem('sc_cart', JSON.stringify(cartItems));
      return cartItems;
    }
  }
};