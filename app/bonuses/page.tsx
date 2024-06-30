'use client';
import Bonuses from '../../components/sections/Bonuses';
import { $user } from '../../context/user';
import { useUnit } from 'effector-react';
import { redirect } from 'next/navigation';
import React from 'react';
export default function BonusesPage() {
  const user = useUnit($user);
  const isLogin = user?.id;

  return isLogin ? <Bonuses /> : redirect('/');
}
