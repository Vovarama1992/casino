import axios from 'axios';

// Базовый API для запросов
export const api = axios.create({
  withCredentials: true,
  baseURL: 'https://api.moon-gamble.fans/', // укажите адрес вашего бэкенда
  headers: {
    'Content-Type': 'application/json',
  },
});

// Получаем токен из localStorage
const token =
  typeof window !== 'undefined' && localStorage.getItem('accessToken');

// Защищенный API с авторизацией
export const protectedApi = axios.create({
  baseURL: 'https://api.moon-gamble.fans/', // укажите адрес вашего бэкенда
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});
