'use client';
import React, { useEffect } from 'react';
import Profile from '@/components/sections/Profile';
import { toast } from 'react-toastify';
import { $user, setUser } from '@/context/user';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/navigation';
import { linkVKFx } from '@/api/bonus'; // Убедитесь, что этот импорт корректен

export default function ProfilePage() {
  const user = useUnit($user);
  const isLogin = !!user?.id;
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('VK Authorization Code:', code);

    const processVKCode = async () => {
      if (code) {
        try {
          const response = await linkVKFx(code); // Получаем объект пользователя с VK ID
          if (user && response && response.vk_id) {
            // Обновляем пользователя с новым vk_id
            setUser({
              ...user,
              vk_id: response.vk_id,
            });
            toast.success('VK успешно привязан!');
            // Очищаем URL от параметров
            window.history.replaceState(null, '', window.location.pathname);
          } else {
            throw new Error('VK привязка не удалась');
          }
        } catch (error) {
          console.error('Не удалось привязать VK:', error);
          toast.error('Не удалось привязать VK. Попробуйте снова позже.');
          router.push('/'); // Перенаправление на главную при ошибке
        }
      } else if (!isLogin) {
        router.push('/'); // Перенаправление на главную, если пользователь не залогинен и нет кода
      }
    };

    processVKCode();
  }, [isLogin, router, user]);

  return isLogin ? <Profile /> : null;
}
