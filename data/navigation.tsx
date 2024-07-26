import React from 'react';

import { INavigation } from '@/types/navigation';
import TelegramIcon from './icons/social-media/TelegramIcon';

export const FooterNavigation: INavigation[] = [
  {
    title: 'Казино',
    list: [
      {
        name: 'Слоты',
        link: '/slots',
      },
      /*{
        name: 'Mines',
        link: '/mines',
      },
      {
        name: 'Bubbles',
        link: '/bubbles',
      },
      {
        name: 'Dice',
        link: '/dice',
      },*/
    ],
  },
  {
    title: 'Акции',
    list: [
      {
        name: 'Бонусы',
        link: '/bonuses',
      },
    ],
  },
  {
    title: 'Поддержка',
    list: [
      {
        name: 'FAQ',
        link: '/faq',
      },
      {
        name: 'Поддержка',
        link: '/support',
      },
    ],
  },
  {
    title: 'Мы в соцсетях',
    type: 'social-media',
    list: [
      // {
      //   name: 'VK',
      //   icon: <VKIcon />,
      //   link: 'https://vk.com/',
      // },
      {
        name: 'Telegram',
        icon: <TelegramIcon />,
        link: 'https://t.me/',
      },
    ],
  },
];

import HomeIcon from './icons/navigation/HomeIcon';
import SlotsIcon from './icons/navigation/SlotsIcon';
import ReferralsIcon from './icons/navigation/ReferralsIcon';
import BonusesIcon from './icons/navigation/BonusesIcon';
import SupportIcon from './icons/navigation/SupportIcon';

export const SidebarNavigation: INavigation[] = [
  {
    title: 'Casino',
    list: [
      {
        name: 'Главная',
        link: '/',
        icon: <HomeIcon />,
      },
      {
        name: 'Слоты',
        link: '/slots',
        icon: <SlotsIcon />,
      },
    ],
  },
  /*{
    title: 'Moon Games',
    isExpand: true,
    list: [
      {
        name: 'Mines',
        link: '/mines',
        icon: <MinesIcon />,
      },
      {
        name: 'Dice',
        link: '/dice',
        icon: <DiceIcon />,
      },
      {
        name: 'Bubbles',
        link: '/bubbles',
        icon: <BubblesIcon />,
      },
    ],
  },*/
  {
    title: '',
    list: [
      {
        name: 'Рефералы',
        link: '/referrals',
        icon: <ReferralsIcon />,
      },
      {
        name: 'Бонусы',
        link: '/bonuses',
        icon: <BonusesIcon />,
      },
      {
        name: 'Поддержка',
        link: '/support',
        icon: <SupportIcon />,
      },
    ],
  },
];

export const MobileMenuNavigation: INavigation = {
  title: '',
  list: [
    {
      name: 'Слоты',
      link: '/slots',
      icon: <SlotsIcon />,
    },
    {
      name: 'Главная',
      link: '/',
      icon: <HomeIcon />,
    },
    {
      name: 'Бонусы',
      link: '/bonuses',
      icon: <BonusesIcon />,
    },
  ],
};
