import { CONFIG, sleep } from './config';
import { apiClient } from './apiClient';
import { MOCK_USERS } from './mock/mockUsers';

export const authService = {
  async login({ email, password }) {
    if (CONFIG.USE_MOCK) {
      await sleep();
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      if (!user) throw new Error('Invalid email or password');
      
      const sessionData = { id: user.id, name: user.name, email: user.email };
      localStorage.setItem('sc_auth_token', 'mock_jwt_token_' + Date.now());
      localStorage.setItem('sc_user', JSON.stringify(sessionData));
      return sessionData;
    }
    return apiClient('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  },

  async signup({ name, email, password }) {
    if (CONFIG.USE_MOCK) {
      await sleep();
      const existing = MOCK_USERS.find(u => u.email === email);
      if (existing) throw new Error('An account with this email already exists.');

      const newUser = { id: 'user-' + Date.now(), name, email, password };
      MOCK_USERS.push(newUser);

      const sessionData = { id: newUser.id, name: newUser.name, email: newUser.email };
      localStorage.setItem('sc_auth_token', 'mock_jwt_token_' + Date.now());
      localStorage.setItem('sc_user', JSON.stringify(sessionData));
      return sessionData;
    }
    return apiClient('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) });
  },

  async logout() {
    if (CONFIG.USE_MOCK) {
      await sleep(100);
      localStorage.removeItem('sc_auth_token');
      localStorage.removeItem('sc_user');
      return true;
    }
    return apiClient('/auth/logout', { method: 'POST' });
  },

  getCurrentUser() {
    try {
      const stored = localStorage.getItem('sc_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
};