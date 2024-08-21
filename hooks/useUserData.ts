import { getUserBalance, getUserData } from '@/api/user';
import { setUser } from '@/context/user';
import { useEffect } from 'react';

export const useUserData = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching user data...');
        const { data } = await getUserData({
          url: '/users/me',
        });
        console.log('User data:', data);

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
