import React from 'react';

import styles from './WithdrawalScreen.module.scss';
import { ChangeEvent, useState } from 'react';
import { IPaymentSystem } from '@/types/payments';
import { WithdrawalPaymentSystems } from '@/data/payments';
import Image from 'next/image';
import { useUnit } from 'effector-react';
import { $user, setUser } from '@/context/user';
import { toast } from 'react-toastify';
import { createWithdrawal } from '@/api/wallet';

export default function WithdrawalScreen() {
  const [selectedPaymentSystem, setSelectedPaymentSystem] =
    useState<IPaymentSystem>(WithdrawalPaymentSystems[0]);
  const [withdrawalValue, setWithdrawalValue] = useState<number | null>();
  const user = useUnit($user);
  const minLimit = 500;
  const maxLimit = 15000;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericPattern = /^[0-9]*\.?[0-9]*$/;

    if (numericPattern.test(inputValue)) {
      setWithdrawalValue(+inputValue);
    }
  };

  const valueButtons = [500, 1000, 2000, 5000, 10000];

  const handleCreateWithdrawal = async () => {
    if (!withdrawalValue) {
      toast.error('Заполните поле пополнения');
    } else if (
      withdrawalValue < minLimit ||
      withdrawalValue > maxLimit ||
      Number(user?.balance) < withdrawalValue
    ) {
      if (withdrawalValue < minLimit) {
        toast.error(`Сумма пополнения должна быть больше ${minLimit}`);
      }
      if (withdrawalValue > minLimit) {
        toast.error(`Сумма пополнения должна быть меньше ${maxLimit}`);
      }
      if (Number(user?.balance) < withdrawalValue) {
        toast.error(`Не хватает денег на счету`);
      }
    } else {
      try {
        await createWithdrawal({
          url: '/wallet/withdrawal',
          paymentSystem: selectedPaymentSystem.slug,
          amount: withdrawalValue,
        });
        toast.success('Оплата прошла успешно');
        {
          user &&
            setUser({
              ...user,
              balance: (Number(user?.balance) - withdrawalValue).toString(),
            });
        }
        setWithdrawalValue(null);
      } catch (error) {
        console.error(error);
        toast.error('Произошла ошибка. Повторите позже');
      }
    }
  };

  return (
    <div className={styles.WithdrawalScreen}>
      <div className={styles.Left}>
        <h5 className={styles.Title}>Выберите систему:</h5>
        <ul className={styles.PaymentList}>
          {WithdrawalPaymentSystems.map((item, index) => {
            return (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
              <li
                className={`${styles.PaymentListItem} ${selectedPaymentSystem === item ? styles.PaymentListItemActive : ''}`}
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
                  className={`${styles.ValueButton} ${value === withdrawalValue ? styles.ValueButtonActive : ''}`}
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
