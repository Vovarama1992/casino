import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: 'https://api.moon-gamble.fans',
  headers: {
    'Content-Type': 'application/json',
  },
  maxRedirects: 0, // Отключить автоматическое следование за редиректами
});

const handleRedirect = async (url, data) => {
  try {
    const response = await api.post(url, data);
    console.log('Response data:', response.data);
    return response.data; // Возвращаем токен
  } catch (error) {
    if (error.response && error.response.status === 307) {
      const redirectUrl = error.response.headers.location;
      console.log('Redirecting to:', redirectUrl);
      return handleRedirect(redirectUrl, data); // Повторить запрос с теми же данными
    } else {
      console.error('Error:', error);
      throw error;
    }
  }
};

const login = async () => {
  const data = await handleRedirect('/users/auth/token', {
    username: 'volodzya',
    password: '11Qwerty',
  });
  console.log('Token:', data.access_token); // Используем токен
};

login().catch(error => {
  console.error('Failed to login:', error);
});