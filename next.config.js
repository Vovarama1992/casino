import path from 'path';

const __dirname = path.resolve();

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.moon-gamble.fans/:path*',
      },
    ];
  },
  webpack: (config) => {
    // Добавление алиасов
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'), // корневая директория проекта
      '@components': path.resolve(__dirname, './src/components'), // компоненты
      '@styles': path.resolve(__dirname, './src/styles'), // стили
      '@public': path.resolve(__dirname, './public'), // папка public
    };

    // Если нужно, добавьте алиас для папки шрифтов
    config.resolve.alias['@fonts'] = path.resolve(__dirname, './public/fonts');

    return config;
  },
};

export default nextConfig;
