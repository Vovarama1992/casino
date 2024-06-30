'use client';
import { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import Image from 'next/image';
import { $user } from '@/context/user';
import { avatars } from '@/data/avatar';
import React from 'react';
export default function Avatar({ className }: { className: string }) {
  const user = useUnit($user);
  const [userAvatarId, setUserAvatarId] = useState<number | null>(
    user ? (user.avatar ? +user.avatar : null) : null,
  );

  useEffect(() => {
    const newUserAvatarId = user ? (user.avatar ? +user.avatar : null) : null;
    setUserAvatarId(newUserAvatarId);
  }, [user]);

  const userAvatar = userAvatarId
    ? avatars.find((avatar) => avatar.id === userAvatarId)
    : null;

  return userAvatar ? (
    <Image
      className={className}
      src={userAvatar.url}
      alt={user?.fullname || user?.username || ''}
      width={100}
      height={100}
    />
  ) : (
    <div className={className} />
  );
}
