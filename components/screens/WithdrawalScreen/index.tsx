/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import styles from './WithdrawalScreen.module.scss';
import { ChangeEvent, useState } from 'react';
import { IPaymentSystem } from '@/types/payments';
import { WithdrawalPaymentSystems } from '@/data/payments';
import Image from 'next/image';
import { useUnit } from 'effector-react';
import { $user } from '@/context/user';
import { toast } from 'react-toastify';
import { createWithdrawal, getLastWithdrawalAttempt } from '@/api/wallet';

export default function WithdrawalScreen() {
  const [selectedPaymentSystem, setSelectedPaymentSystem] =
    useState<IPaymentSystem>(WithdrawalPaymentSystems[0]);
  const [withdrawalValue, setWithdrawalValue] = useState<number | null>();
  const user = useUnit($user);
  const userId = user?.id;
  const balance = Number(user?.balance);
  const bonus_balance = Number(user?.bonus_balance) || 0;
  const pure_balance = balance - bonus_balance;
  const minLimit = 500;
  const maxLimit = 15000;

  useEffect(() => {
    const checkLastWithdrawalAttempt = async () => {
      try {
        const lastWithdrawal = await getLastWithdrawalAttempt({
          url: '/wallet/withdrawals/last',
        });

        const lastAttemptDate = new Date(lastWithdrawal.created_at);
        const now = new Date();
        const timeDifference = now.getTime() - lastAttemptDate.getTime();
        const hoursSinceLastAttempt = timeDifference / (1000 * 3600);

        if (hoursSinceLastAttempt < 24) {
          toast.error('Вы можете делать вывод средств только раз в 24 часа.');
        }
      } catch (error) {
        toast.error('Не удалось проверить время последней попытки вывода.');
      }
    };

    checkLastWithdrawalAttempt();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericPattern = /^[0-9]*\.?[0-9]*$/;

    if (numericPattern.test(inputValue)) {
      setWithdrawalValue(+inputValue);
    }
  };

  const valueButtons = [500, 1000, 2000, 5000, 10000];

  const handleCreateWithdrawal = async () => {
    try {
      const lastWithdrawal = await getLastWithdrawalAttempt({
        url: '/wallet/withdrawals/last',
      });

      const lastAttemptDate = new Date(lastWithdrawal.created_at);
      const now = new Date();
      const timeDifference = now.getTime() - lastAttemptDate.getTime();
      const hoursSinceLastAttempt = timeDifference / (1000 * 3600);

      if (hoursSinceLastAttempt < 24) {
        toast.error('Вы можете делать вывод средств только раз в 24 часа.');
        return;
      }

      if (!withdrawalValue) {
        toast.error('Заполните поле пополнения');
      } else if (
        withdrawalValue < minLimit ||
        withdrawalValue > maxLimit ||
        pure_balance < withdrawalValue
      ) {
        if (withdrawalValue < minLimit) {
          toast.error(`Сумма вывода должна быть больше ${minLimit}`);
        }
        if (withdrawalValue > maxLimit) {
          toast.error(`Сумма вывода должна быть не больше ${pure_balance}`);
        }
        if (pure_balance < withdrawalValue) {
          toast.error(`Не хватает денег на счету`);
        }
      } else {
        await createWithdrawal({
          url: '/wallet/withdrawal',
          paymentSystem: selectedPaymentSystem.slug,
          amount: withdrawalValue,
          user_id: userId || 1,
        });
        toast.success('Заявка на вывод средств отправлена');
      }
    } catch (error) {
      toast.error('Произошла ошибка при отправке заявки на вывод');
    }
  };

  return (
    <div className={styles.WithdrawalScreen}>
      <div className={styles.Left}>
        <h5 className={styles.Title}>Выберите систему:</h5>
        <ul className={styles.PaymentList}>
          {WithdrawalPaymentSystems.map((item, index) => {
            return (
              <li
                className={`${styles.PaymentListItem} ${
                  selectedPaymentSystem === item
                    ? styles.PaymentListItemActive
                    : ''
                }`}
                onClick={() => {
                  setSelectedPaymentSystem(item);
                  setWithdrawalValue(null);
                }}
                key={index}
              >
                <div className={styles.PaymentListItemIcon}>{item.icon}</div>
                <span className={styles.PaymentListItemName}>{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.Right}>
        <div className={styles.SelectedPaymentSystem}>
          <h5 className={styles.Title}>Выбранная система:</h5>
          <li
            className={`${styles.PaymentListItem} ${styles.PaymentListItemActive}`}
          >
            <div className={styles.PaymentListItemIcon}>
              {selectedPaymentSystem.icon}
            </div>
            <span className={styles.PaymentListItemName}>
              {selectedPaymentSystem.name}
            </span>
          </li>
        </div>
        <div className={styles.Withdrawal}>
          <div className={styles.Form}>
            <div style={{ width: '100%' }}>
              <h5 className={styles.Title}>Cумма вывода</h5>
              <input
                type="text"
                placeholder="500"
                onChange={handleChange}
                value={withdrawalValue || ''}
                className={styles.WithdrawalInput}
              />
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                gap: '5px',
              }}
            >
              <div style={{ width: '100%' }}>
                <h5 className={styles.Title}>Cумма к списанию</h5>
                <input
                  type="text"
                  placeholder="500"
                  onChange={handleChange}
                  value={withdrawalValue || ''}
                  className={styles.WithdrawalInput}
                />
              </div>
              <div className={styles.CurrencyIcon}>
                <Image
                  src="/media/Currency.svg"
                  alt="MoonCoin"
                  width={0}
                  height={0}
                />
              </div>
            </div>
          </div>
          <div className={styles.ValueButtons}>
            {valueButtons.map((value) => {
              return (
                <button
                  className={`${styles.ValueButton} ${
                    value === withdrawalValue ? styles.ValueButtonActive : ''
                  }`}
                  onClick={() => setWithdrawalValue(value)}
                  key={value}
                >
                  {value}
                </button>
              );
            })}
          </div>
          <button
            className={styles.WithdrawalButton}
            onClick={handleCreateWithdrawal}
          >
            Создать заявку
          </button>
          <span className={styles.WithdrawalInfo}>
            Лимит одного пополнения:{' '}
            <b>
              {minLimit} - {maxLimit}
            </b>
          </span>
        </div>
      </div>
    </div>
  );
}
