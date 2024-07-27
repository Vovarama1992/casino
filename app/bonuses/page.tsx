'use client';
import React, { useEffect } from 'react';
import Bonuses from '../../components/sections/Bonuses';
import { $user } from '../../context/user';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/navigation';

export default function BonusesPage() {
  const user = useUnit($user);
  const isLogin = !!user?.id;
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push('/'); // Перенаправление на главную страницу, если пользователь не залогинен
    }
  }, [isLogin, router]);

  return isLogin ? <Bonuses /> : null;
}
