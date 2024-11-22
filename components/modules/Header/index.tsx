'use client';
import React from 'react';

import Logo from '@/components/elements/Logo';
import styles from './Header.module.scss';
import Image from 'next/image';
import WalletIcon from './icons/WalletIcon';
import { openAuthModal } from '@/context/modals';
import Link from 'next/link';
import { useUnit } from 'effector-react';
import { $user } from '@/context/user';
import Avatar from '@/components/elements/Avatar';

export default function Header() {
  const user = useUnit($user);
  const isLogin = user?.id;

  const openRegistrationModal = () => {
    openAuthModal({ mode: 'registration' }); // Передаем режим регистрации
  };

  const openLoginModal = () => {
    openAuthModal({ mode: 'login' }); // Передаем режим авторизации
  };

  return (
    <>
      <header className={styles.Header}>
        <Logo
          className={`${styles.Logo} ${isLogin ? styles.LogoProfileMode : ''}`}
        />
        {isLogin ? (
          <div className={styles.ProfileBlock}>
            <div className={styles.WalletBox}>
              <button className={styles.WalletButton}>
                <WalletIcon />
              </button>
              <div className={styles.Balance}>
                {Math.round(Number(user.balance))}
                <Image
                  src="/media/Currency.svg"
                  alt="MoonCoin"
                  width={0}
                  height={0}
                />
              </div>
            </div>
            <button className={styles.DepositButton}>Пополнить</button>
            <Link href="/profile" className={styles.Profile}>
              <Avatar className={styles.ProfileAvatar} />
              <span className={styles.ProfileName}>
                {user.fullname || user.username}
              </span>
            </Link>
          </div>
        ) : (
          <div className={styles.AuthBlock}>
            <button
              className={`${styles.Button} ${styles.RegistrationButton}`}
              onClick={openRegistrationModal}
            >
              Регистрация
            </button>
            <button
              className={`${styles.Button} ${styles.AuthButton}`}
              onClick={openLoginModal}
            >
              Войти
            </button>
          </div>
        )}
      </header>
    </>
  );
}
