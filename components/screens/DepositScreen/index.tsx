import React from 'react';

import styles from './DepositScreen.module.scss';
import { ChangeEvent, useState } from 'react';
import { IPaymentSystem } from '@/types/payments';
import { DepositPaymentSystems } from '@/data/payments';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { createDeposit } from '@/api/wallet';
import { $user, setUser } from '@/context/user';
import { useUnit } from 'effector-react';

export default function DepositScreen() {
  const [selectedPaymentSystem, setSelectedPaymentSystem] =
    useState<IPaymentSystem>(DepositPaymentSystems[0]);
  const [depositValue, setDepositValue] = useState<number | null>();
  const user = useUnit($user);
  const minLimit = 500;
  const maxLimit = 15000;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericPattern = /^[0-9]*\.?[0-9]*$/;

    if (numericPattern.test(inputValue)) {
      setDepositValue(+inputValue);
    }
  };

  const valueButtons = [500, 1000, 2000, 5000, 10000];

  const handleCreateDeposit = async () => {
    if (!depositValue) {
      toast.error('Заполните поле пополнения');
    } else if (depositValue < minLimit || depositValue > maxLimit) {
      if (depositValue < minLimit) {
        toast.error(`Сумма пополнения должна быть больше ${minLimit}`);
      }
      if (depositValue > minLimit) {
        toast.error(`Сумма пополнения должна быть меньше ${maxLimit}`);
      }
    } else {
      try {
        await createDeposit({
          url: '/wallet/deposit?transaction_type=IN',
          paymentSystem: selectedPaymentSystem.slug,
          amount: depositValue,
        });
        toast.success('Оплата прошла успешно');
        {
          user &&
            setUser({
              ...user,
              balance: (Number(user?.balance) + depositValue).toString(),
            });
        }
        setDepositValue(null);
      } catch (error) {
        console.error(error);
        toast.error('Произошла ошибка. Повторите позже');
      }
    }
  };

  return (
    <div className={styles.DepositScreen}>
      <div className={styles.Left}>
        <h5 className={styles.Title}>Выберите систему:</h5>
        <ul className={styles.PaymentList}>
          {DepositPaymentSystems.map((item, index) => {
            return (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
              <li
                className={`${styles.PaymentListItem} ${selectedPaymentSystem === item ? styles.PaymentListItemActive : ''}`}
                onClick={() => setSelectedPaymentSystem(item)}
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
        <div className={styles.Deposit}>
          <div className={styles.Form}>
            <div style={{ width: '100%' }}>
              <h5 className={styles.Title}>Cумма пополнения</h5>
              <input
                type="text"
                placeholder="500"
                onChange={handleChange}
                value={depositValue || ''}
                className={styles.DepositInput}
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
          <div className={styles.ValueButtons}>
            {valueButtons.map((value) => {
              return (
                <button
                  className={`${styles.ValueButton} ${value === depositValue ? styles.ValueButtonActive : ''}`}
                  onClick={() => setDepositValue(value)}
                  key={value}
                >
                  {value}
                </button>
              );
            })}
          </div>
          <button
            className={styles.DepositButton}
            onClick={handleCreateDeposit}
          >
            Перейти к оплате
          </button>
          <span className={styles.DepositInfo}>
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
