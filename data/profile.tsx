import React from 'react';
import TelegramIcon from './icons/social-media/TelegramIcon';
import VKIcon from './icons/social-media/VKIcon';

const REDIRECT_URI_LINK = 'https://moon-gamble.fans/bonuses/';

const vkAuthUrl = `https://oauth.vk.com/authorize?client_id=52108056&redirect_uri=${REDIRECT_URI_LINK}&response_type=code`;

const TELEGRAM_BOT_NAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME;
const telegramAuthUrl = `https://t.me/${TELEGRAM_BOT_NAME}?start=some_auth_code`;

export const ProfileSocialMedia = [
  {
    name: 'VK',
    icon: <VKIcon />,
    status: 'unlinked',
    authUrl: vkAuthUrl,
  },
  {
    name: 'Telegram',
    icon: <TelegramIcon />,
    status: 'unlinked',
    authUrl: telegramAuthUrl,
  },
];
