import { CONFIG } from './config';

export const apiClient = async (endpoint, options = {}) => {
  if (CONFIG.USE_MOCK) {
    throw new Error('apiClient executed directly while USE_MOCK is active.');
  }

  const token = localStorage.getItem('sc_auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${CONFIG.API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP Error ${response.status}`);
  }

  return response.json();
};