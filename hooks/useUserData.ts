import { getUserBalance, getUserData } from '@/api/user';
import { setUser } from '@/context/user';
import { useEffect } from 'react';

export const useUserData = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserData({
          url: '/users/me',
        });

        const { balance, bonus_balance, pure_balance } = await getUserBalance({
          url: '/wallet/balance',
        });

        setUser({
          ...data,
          bonus_balance,
          pure_balance,
          balance,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
};
