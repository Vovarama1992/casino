import React from 'react';

import { IProfileSocialMedia } from '@/types/profile';
import TelegramIcon from './icons/social-media/TelegramIcon';
import VKIcon from './icons/social-media/VKIcon';

export const ProfileSocialMedia: IProfileSocialMedia[] = [
  {
    icon: <TelegramIcon />,
    status: 'unlinked',
  },
  {
    icon: <VKIcon />,
    status: 'unlinked',
  },
];
