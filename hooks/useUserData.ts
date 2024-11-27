import { getUserBalance, getUserData } from '@/api/user';
import { useUnit } from 'effector-react';
import { $user, setUser } from '@/context/user';
import { createBonusDeposit } from '@/api/wallet';
import { useEffect } from 'react';

// Функция для получения кешированных данных
const getCachedUserData = () => {
  const cachedUser = localStorage.getItem('user_data');
  return cachedUser ? JSON.parse(cachedUser) : null;
};

// Функция для кеширования данных пользователя
const setCachedUserData = (data: any) => {
  localStorage.setItem('user_data', JSON.stringify(data));
};

export const useUserData = () => {
  const user = useUnit($user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching user data...');
        const { data } = await getUserData({ url: '/users/me' });
        console.log('User data:', data);

        // Проверяем, если в новых данных есть vk_id, а в кешированных нет
        const cachedUser = getCachedUserData();
        if (data?.vk_id && cachedUser && !cachedUser?.vk_id) {
          // Если vk_id появился, делаем бонусный депозит
          await createBonusDeposit({
            url: '/wallet/bonus-deposit',
            paymentSystem: 'internal', // Укажите систему платежей
            amount: 10, // Сумма бонуса
          });
        }

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
        setCachedUserData(newUserData); // Кешируем обновленные данные
        console.log('User data and balance set in context and cached.');
      } catch (error) {
        console.error('Error fetching user data or balance:', error);
      }
    };

    fetchData();
  }, []);
};
