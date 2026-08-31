export const CONFIG = {
  USE_MOCK: true,
  API_URL: import.meta.env.VITE_API_URL || 'https://api.souravcreations.com/v1',
  SIMULATED_DELAY: 350
};

export const sleep = (ms = CONFIG.SIMULATED_DELAY) =>
  new Promise((resolve) => setTimeout(resolve, ms));