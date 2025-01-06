import axios from 'axios';
import { Post, Comment } from '../types/blog';
import { AuthResponse, LoginData, RegisterData } from '../types/auth';

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
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/users/register', data);
    return response.data;
  },
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/users/login', data);
    return response.data;
  },
};

interface CreatePostData {
  title: string;
  content: string;
}

interface UpdatePostData {
  title?: string;
  content?: string;
}

export const blogs = {
  create: async (data: CreatePostData): Promise<Post> => {
    const response = await api.post('/blogs', data);
    return response.data;
  },
  list: async (): Promise<Post[]> => {
    const response = await api.get('/blogs');
    return response.data;
  },
  get: async (id: string): Promise<Post> => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },
  update: async (id: string, data: UpdatePostData): Promise<Post> => {
    const response = await api.put(`/blogs/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/blogs/${id}`);
  },
};

interface CreateCommentData {
  content: string;
  post_id: string;
}

export const comments = {
  create: async (data: CreateCommentData): Promise<Comment> => {
    const response = await api.post('/comments', data);
    return response.data;
  },
  list: async (postId: string): Promise<Comment[]> => {
    const response = await api.get(`/comments?post_id=${postId}`);
    return response.data;
  },
};

export default api;