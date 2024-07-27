'use client';
import React, { useEffect } from 'react';
import Profile from '@/components/sections/Profile';

import { $user } from '@/context/user';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const user = useUnit($user);
  const isLogin = !!user?.id;
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push('/'); // Перенаправление на главную страницу, если пользователь не залогинен
    }
  }, [isLogin, router]);

  return isLogin ? <Profile /> : null;
}
