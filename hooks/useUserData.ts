import { getUserBalance, getUserData } from '@/api/user';
import { useUnit } from 'effector-react';
import { $user, setUser } from '@/context/user';
import { createBonusDeposit } from '@/api/wallet';
import { useEffect } from 'react';

export const useUserData = () => {
  const user = useUnit($user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching user data...');
        const { data } = await getUserData({
          url: '/users/me',
        });
        console.log('User data:', data);

        if (data?.vk_id && user && user.balance && !user?.vk_id) {
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

        setUser({
          ...data,
          bonus_balance,
          pure_balance,
          balance,
        });
        console.log('User data and balance set in context.');
      } catch (error) {
        console.error('Error fetching user data or balance:', error);
      }
    };

    fetchData();
  }, []);
};
