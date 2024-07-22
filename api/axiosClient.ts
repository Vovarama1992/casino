import axios from 'axios';

// Функция для добавления слэша к URL, если его нет
const addTrailingSlash = (url: string) => {
  return url.endsWith('/') ? url : `${url}/`;
};

export const api = axios.create({
  withCredentials: true,
  baseURL: addTrailingSlash('https://api.moon-gamble.fans'), // проксирование запросов через Next.js
  headers: {
    'Content-Type': 'application/json',
  },
});

const token =
  typeof window !== 'undefined' && localStorage.getItem('accessToken');

export const protectedApi = axios.create({
  baseURL: addTrailingSlash('https://api.moon-gamble.fans'),
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

// Пример использования обертки для добавления слэша к URL в запросах
export const fetchUserData = async () => {
  try {
    const response = await protectedApi.get(addTrailingSlash('/users/me'));
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

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
