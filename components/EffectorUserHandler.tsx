'use client';

import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $user, setUser } from '@/context/user';
import { getUserData } from '@/api/user';
import { getUserBalance } from '@/api/user';
import { createBonusDeposit } from '@/api/wallet';
import { toast } from 'react-toastify';
import { IUser } from '@/types/user';

const EffectorUserHandler = () => {
  const user = useUnit($user);

  useEffect(() => {
    // Загружаем данные пользователя с бэка
    getUserData({ url: '/users/me' })
      .then((response) => {
        const fetchedUser = response.data;

        // Проверяем условия:
        // 1. На фронте есть объект user.
        // 2. В этом объекте отсутствует vk_id.
        // 3. С бэка vk_id пришёл.
        if (user && !user.vk_id && fetchedUser?.vk_id) {
          console.log(
            'VK ID received from backend but missing on frontend. Checking balance.',
          );

          // Получаем бонусный баланс с бэка
          getUserBalance({ url: '/wallet/balance' })
            .then((balanceResponse) => {
              const { bonus_balance } = balanceResponse.data;

              // Проверяем, что бонусный баланс меньше 9
              if (Number(bonus_balance) < 9) {
                console.log(
                  'Bonus balance is less than 9. Crediting bonus and updating user.',
                );

                // Отправляем бонус за привязку VK
                createBonusDeposit({
                  url: '/wallet/bonus-deposit',
                  paymentSystem: 'internal',
                  amount: 10,
                })
                  .then(() => {
                    console.log('Bonus successfully credited.');
                    toast.success('Бонус успешно начислен!');

                    // Обновляем пользователя на фронте
                    setUser({
                      ...user,
                      vk_id: fetchedUser.vk_id,
                    } as IUser);
                  })
                  .catch((error) => {
                    console.error('Failed to credit bonus:', error);
                    toast.error(
                      'Не удалось начислить бонус. Попробуйте позже.',
                    );
                  });
              } else {
                console.log('Bonus balance is 9 or more. No action needed.');
              }
            })
            .catch((balanceError) => {
              console.error('Failed to fetch user balance:', balanceError);
            });
        } else {
          console.log('No updates needed for user.');
        }
      })
      .catch((error) => {
        console.error('Failed to fetch user data:', error);
      });
  }, [user]);

  return null; // Компонент ничего не рендерит
};

export default EffectorUserHandler;
