'use client';

import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $user, setUser } from '@/context/user';
import { getUserData } from '@/api/user';
import { createBonusDeposit } from '@/api/wallet';
import { toast } from 'react-toastify';
import { IUser } from '@/types/user';

const EffectorUserHandler = () => {
  const user = useUnit($user);

  useEffect(() => {
    getUserData({ url: '/users/me' })
      .then((response) => {
        const fetchedUser = response.data;

        if (fetchedUser?.vk_id && user && !user.vk_id) {
          console.log(
            'Updating user with VK ID and bonus balance on frontend.',
          );

          const updatedBonusBalance = (Number(user.bonus_balance) || 0) + 10;

          setUser({
            ...(user || {}),
            vk_id: fetchedUser.vk_id,
            bonuse_balance: String(updatedBonusBalance),
          } as IUser);

          createBonusDeposit({
            url: '/wallet/bonus-deposit',
            paymentSystem: 'internal',
            amount: 10,
          })
            .then(() => {
              console.log('Bonus successfully credited.');
              toast.success('Бонус успешно начислен!');
            })
            .catch((error) => {
              console.error('Failed to credit bonus:', error);
              toast.error('Не удалось начислить бонус. Попробуйте позже.');
            });
        }
      })
      .catch((error) => {
        console.error('Failed to fetch user data:', error);
      });
  }, [user]);

  return null; // Этот компонент ничего не рендерит
};

export default EffectorUserHandler;
