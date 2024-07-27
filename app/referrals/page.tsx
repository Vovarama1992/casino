'use client';
import React, { useEffect } from 'react';
import Referrals from '@/components/sections/Referrals';
import { $user } from '@/context/user';
import { useMainUnframed } from '@/hooks/useMainUnframed';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/navigation';

export default function ReferralsPage() {
  useMainUnframed();
  const user = useUnit($user);
  const isLogin = !!user?.id;
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push('/'); // Перенаправление на главную страницу, если пользователь не залогинен
    }
  }, [isLogin, router]);

  return isLogin ? <Referrals /> : null;
}
