import { getUserBalance, getUserData } from '@/api/user';
import { useUnit } from 'effector-react';
import { $user, setUser } from '@/context/user';

import { useEffect } from 'react';

export const useUserData = () => {
  const user = useUnit($user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching user data...');
        const { data } = await getUserData({ url: '/users/me' });
        console.log('User data:', data);

        // Проверяем, если в новых данных есть vk_id, а в кешированных нет

        console.log('Fetching user balance...');
        const { balance, bonus_balance, pure_balance } = await getUserBalance({
          url: '/wallet/balance',
        });
        console.log('User balance:', { balance, bonus_balance, pure_balance });

        // Обновляем данные в контексте и кешируем их
        const newUserData = {
          ...data,
          vk_id: data?.vk_id || user?.vk_id, // Сохраняем vk_id, если его нет в новых данных
          bonus_balance,
          pure_balance,
          balance,
        };

        setUser(newUserData);

        console.log('User data and balance set in context and cached.');
      } catch (error) {
        console.error('Error fetching user data or balance:', error);
      }
    };

    fetchData();
  }, []);
};
