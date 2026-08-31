import { CONFIG, sleep } from './config';
import { apiClient } from './apiClient';
import { MOCK_CATEGORIES } from './mock/mockCategories';

export const categoryService = {
  async getCategories() {
    if (CONFIG.USE_MOCK) {
      await sleep();
      return [...MOCK_CATEGORIES];
    }
    return apiClient('/categories');
  }
};