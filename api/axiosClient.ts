import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  baseURL: '/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const token =
  typeof window !== 'undefined' && localStorage.getItem('accessToken');

export const protectedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});
