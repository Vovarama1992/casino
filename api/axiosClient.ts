import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  baseURL: 'https://api.moon-gamble.fans/', // проксирование запросов через Next.js
  headers: {
    'Content-Type': 'application/json',
  },
});

const token =
  typeof window !== 'undefined' && localStorage.getItem('accessToken');

export const protectedApi = axios.create({
  baseURL: 'https://api.moon-gamble.fans/',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

/*import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  baseURL: 'https://api.moon-gamble.fans/', // проксирование запросов через Next.js
  headers: {
    'Content-Type': 'application/json',
  },
});

const token =
  typeof window !== 'undefined' && localStorage.getItem('accessToken');

export const protectedApi = axios.create({
  baseURL: 'https://api.moon-gamble.fans/',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});*/
