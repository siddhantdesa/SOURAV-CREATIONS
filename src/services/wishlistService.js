import { CONFIG, sleep } from './config';

export const wishlistService = {
  getWishlist() {
    try {
      const stored = localStorage.getItem('sc_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  async syncWishlist(items) {
    if (CONFIG.USE_MOCK) {
      await sleep(100);
      localStorage.setItem('sc_wishlist', JSON.stringify(items));
      return items;
    }
  }
};