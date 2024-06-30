'use client';
import Referrals from '@/components/sections/Referrals';
import { $user } from '@/context/user';
import { useMainUnframed } from '@/hooks/useMainUnframed';
import { useUnit } from 'effector-react';
import { redirect } from 'next/navigation';
import React from 'react';
export default function ReferralsPage() {
  useMainUnframed();
  const user = useUnit($user);
  const isLogin = user?.id;

  return isLogin ? <Referrals /> : redirect('/');
}
