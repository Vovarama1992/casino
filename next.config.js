import path from 'path';

const __dirname = path.resolve();

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path((?!.*\\/$).*)', // Соответствие всем путям, не заканчивающимся на /
        destination: '/:path*/', // Добавление слэша в конец
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.moon-gamble.fans/:path*',
      },
    ];
  },
  trailingSlash: true, // Добавление слэша ко всем путям
  webpack: (config) => {
    // Добавление алиасов
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'), // корневая директория проекта
      '@components': path.resolve(__dirname, './src/components'), // компоненты
      '@styles': path.resolve(__dirname, './src/styles'), // стили
      '@public': path.resolve(__dirname, './public'), // папка public
    };

    // Добавление алиаса для папки шрифтов
    config.resolve.alias['@fonts'] = path.resolve(__dirname, './public/fonts');

    return config;
  },
};

export default nextConfig;
