import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8080';

// Configure axios defaults
const token = localStorage.getItem('authToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/users/login`,
  REGISTER: `${API_BASE_URL}/users/register`,
  
  // Foods
  FOODS: `${API_BASE_URL}/foods`,
  FOOD_BY_ID: (id) => `${API_BASE_URL}/foods/${id}`,
  SEARCH_FOODS: (query) => `${API_BASE_URL}/foods/search?q=${query}`,
  FILTER_FOODS: (params) => {
    const queryParams = new URLSearchParams(params).toString();
    return `${API_BASE_URL}/foods/filter?${queryParams}`;
  },
  
  // Reviews
  FOOD_REVIEWS: (foodId) => `${API_BASE_URL}/foods/${foodId}/reviews`,
  FOOD_RATING: (foodId) => `${API_BASE_URL}/foods/${foodId}/rating`,
  DELETE_REVIEW: (reviewId) => `${API_BASE_URL}/foods/reviews/${reviewId}`,
  
  // Cart
  CART: `${API_BASE_URL}/cart`,
  CART_ADD: `${API_BASE_URL}/cart/add`,
  CART_UPDATE: `${API_BASE_URL}/cart/update`,
  CART_REMOVE: (id) => `${API_BASE_URL}/cart/remove/${id}`,
  CART_CLEAR: `${API_BASE_URL}/cart/clear`,
  
  // Orders
  ORDERS: `${API_BASE_URL}/orders`,
  ORDER_BY_ID: (id) => `${API_BASE_URL}/orders/${id}`,
  USER_ORDERS: `${API_BASE_URL}/orders/user`,
  ORDERS_BY_STATUS: (status) => `${API_BASE_URL}/orders/status/${status}`,
  ORDER_STATUS: (id) => `${API_BASE_URL}/orders/${id}/status`,
  ORDER_PAYMENT: (id) => `${API_BASE_URL}/orders/${id}/payment`,
  PAYMENT_VERIFY: `${API_BASE_URL}/orders/payment/verify`,
  ORDER_CANCEL: (id) => `${API_BASE_URL}/orders/${id}/cancel`,
  ORDER_TRACKING: (id) => `${API_BASE_URL}/orders/${id}/tracking`,
};

export default axios;
