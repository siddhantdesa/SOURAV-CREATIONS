import { apiClient } from './apiClient';

const MOCK_PRODUCTS = [
  { 
    _id: '1', 
    name: 'Handcrafted Wooden 3D Frame', 
    price: 1499, 
    category: 'Frames', 
    image: '/images/3d-frame.jpeg' 
  },
  { 
    _id: '2', 
    name: 'Personalized Anniversary Shadow Box', 
    price: 1999, 
    category: 'Shadow Boxes', 
    image: '/images/anniversary-frame.jpeg' 
  },
  { 
    _id: '3', 
    name: 'Virat Kohli Tribute Frame', 
    price: 1799, 
    category: 'Frames', 
    image: '/images/cricket-frame.jpeg' 
  },
  { 
    _id: '4', 
    name: 'Custom Rakhi Special Keepsake', 
    price: 499, 
    category: 'Gifts', 
    image: '/images/rakhi-special.jpeg' 
  }
];

const MOCK_CATEGORIES = ['Frames', 'Shadow Boxes', 'Gifts'];

export const productService = {
  getProducts: async (params = {}) => {
    try {
      return await apiClient.get(`/products${new URLSearchParams(params).toString() ? `?${new URLSearchParams(params)}` : ''}`);
    } catch {
      console.warn('Backend unavailable, rendering mock data.');
      return MOCK_PRODUCTS;
    }
  },
  getProductById: async (id) => {
    try {
      return await apiClient.get(`/products/${id}`);
    } catch {
      return MOCK_PRODUCTS.find(p => p._id === id) || MOCK_PRODUCTS[0];
    }
  },
  getCategories: async () => {
    try {
      return await apiClient.get('/categories');
    } catch {
      return MOCK_CATEGORIES;
    }
  },
  getFeaturedProducts: async () => {
    try {
      return await apiClient.get('/products?featured=true');
    } catch {
      return MOCK_PRODUCTS;
    }
  },
  getNewArrivals: () => apiClient.get('/products?sort=newest'),
  getBestSellers: () => apiClient.get('/products?sort=bestsellers'),
};