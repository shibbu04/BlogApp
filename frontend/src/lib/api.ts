import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: async (data: { username: string; email: string; password: string }) => {
    const response = await api.post('/users/register', data);
    return response.data;
  },
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/users/login', data);
    return response.data;
  },
};

export const blogs = {
  create: async (data) => {
    const response = await api.post('/blogs', data);
    return response.data;
  },
  list: async () => {
    const response = await api.get('/blogs');
    return response.data;
  },
  get: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/blogs/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },
};

export const comments = {
  create: async (data) => {
    const response = await api.post('/comments', data);
    return response.data;
  },
  list: async (postId) => {
    const response = await api.get(`/comments?post_id=${postId}`);
    return response.data;
  },
};

export default api;