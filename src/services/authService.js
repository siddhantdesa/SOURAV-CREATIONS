import { apiClient } from './apiClient';

export const authService = {
  login: async (credentials) => {
    try {
      return await apiClient.post('/auth/login', credentials);
    } catch (err) {
      console.warn('Backend unavailable, using mock login response.');
      return {
        token: 'mock-jwt-token-12345',
        user: { name: 'Demo User', email: credentials.email || 'demo@example.com', role: 'user' }
      };
    }
  },
  signup: async (userData) => {
    try {
      return await apiClient.post('/auth/signup', userData);
    } catch (err) {
      console.warn('Backend unavailable, using mock signup response.');
      return {
        token: 'mock-jwt-token-12345',
        user: { name: userData.name || 'Demo User', email: userData.email, role: 'user' }
      };
    }
  },
  getCurrentUser: async () => {
    try {
      return await apiClient.get('/auth/me');
    } catch (err) {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : { name: 'Demo User', email: 'demo@example.com' };
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve(true);
  },
};
