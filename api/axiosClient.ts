import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  baseURL: 'https://api.moon-gamble.fans/', // Локальный адрес бэкенда
  headers: {
    'Content-Type': 'application/json',
  },
});

// Получаем токен из localStorage
const token =
  typeof window !== 'undefined' && localStorage.getItem('accessToken');

// Защищенный API с авторизацией
export const protectedApi = axios.create({
  baseURL: 'https://api.moon-gamble.fans/', // Локальный адрес бэкенда
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

//'https://api.moon-gamble.fans/'
