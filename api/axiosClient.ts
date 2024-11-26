import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:8000/', // Локальный адрес бэкенда
  headers: {
    'Content-Type': 'application/json',
  },
});

// Получаем токен из localStorage
const token =
  typeof window !== 'undefined' && localStorage.getItem('accessToken');

// Защищенный API с авторизацией
export const protectedApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Локальный адрес бэкенда
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

//'https://api.moon-gamble.fans/'

//'http://127.0.0.1:8000/'
