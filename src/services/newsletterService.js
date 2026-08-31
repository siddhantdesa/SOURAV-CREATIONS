import { CONFIG, sleep } from './config';
import { apiClient } from './apiClient';

export const newsletterService = {
  async subscribe(email) {
    if (CONFIG.USE_MOCK) {
      await sleep();
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address.');
      }
      return { success: true, message: 'Thank you for subscribing to Sourav Creations!' };
    }
    return apiClient('/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
  }
};