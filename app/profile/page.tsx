'use client';
import Profile from '@/components/sections/Profile';
import { $user } from '@/context/user';
import { useUnit } from 'effector-react';
import { redirect } from 'next/navigation';
import React from 'react';
export default function ProfilePage() {
  const user = useUnit($user);
  const isLogin = user?.id;

  return isLogin ? <Profile /> : redirect('/');
}
