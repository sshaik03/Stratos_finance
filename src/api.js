import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('Starting Request:', request)
  return request
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const registerUser = (data) => api.post('/api/users/register', data);
export const loginUser = (data) => api.post('/api/users/login', data);
export const getUserProfile = (token) =>
  api.get('/api/users/profile', {
    headers: { 'x-auth-token': token },
  });
export const getAllPosts = () => api.get('/api/community/posts');
export const createPost = (data) => api.post('/api/community/posts', data);
export const likePost = (postId, token) => 
  api.put(`/api/community/posts/${postId}/like`, {}, {
    headers: { 'x-auth-token': token }
  });
export const commentOnPost = (postId, data, token) => 
  api.post(`/api/community/posts/${postId}/comments`, data, {
    headers: { 'x-auth-token': token }
  });

export default api;