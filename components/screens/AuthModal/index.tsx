'use client';
import React from 'react';

import ModalLayout from '@/components/layouts/ModalLayout';
import { $authModalIsOpen, closeAuthModal } from '@/context/modals';
import styles from './AuthModal.module.scss';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
//import VKIcon from '@/data/icons/social-media/VKIcon';
import PasswordInput from '@/components/elements/Inputs/PasswordInput';
import LoginInput from '@/components/elements/Inputs/LoginInput';
import { signInFx, signUpFx } from '../../../api/auth';
import { toast } from 'react-toastify';
import queryString from 'query-string';

export default function AuthModal() {
  const modalIsOpen = useUnit($authModalIsOpen);
  const [isSignIn, setIsSignIn] = useState<boolean>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [fingerprint, setFingerprint] = useState(12345);
  console.log(fingerprint);
  const parsed = queryString.parseUrl(
    typeof window !== 'undefined' ? window.location.href : '',
  );

  const referrerId = parsed.query.referrer_id;
  console.log('referrerId_check' + referrerId);

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const client = require('clientjs');
      const fingerprint = client.getFingerprint();
      setFingerprint(fingerprint);
      console.log('useffect finger: ' + fingerprint);
    } catch (error) {
      /* empty */
    }
  }, []);

  const clearInputs = () => {
    setUsername('');
    setPassword('');
    setRepeatPassword('');
    setUsernameError('');
    setPasswordError('');
    setRepeatPasswordError('');
  };

  useEffect(() => {
    const modalState = localStorage.getItem('authModal');
    if (modalState === 'registration') {
      setIsSignIn(false);
    } else {
      setIsSignIn(true);
    }
  });

  const handleClose = () => {
    closeAuthModal();
    setIsSignIn(true);
    clearInputs();
  };

  const handleChangeMode = () => {
    if (!isSignIn) {
      localStorage.setItem('authModal', 'login');
    } else {
      localStorage.setItem('authModal', 'registration');
    }
    setIsSignIn(!isSignIn);
    clearInputs();
  };

  const registerUser = async () => {
    if (
      username &&
      password &&
      repeatPassword &&
      password === repeatPassword &&
      username.length <= 16 &&
      password.length >= 8 &&
      password.length <= 32
    ) {
      try {
        console.log('referrerId: ' + referrerId);

        // Создаем объект с обязательными параметрами
        const signUpData = {
          url: `/users/register`,
          username: username,
          password: password,
          fingerprint: password,
        };

        // Если referrerId существует, добавляем его в URL
        if (referrerId) {
          signUpData.url += `?referrer_id=${referrerId}`;
        }

        // Выполняем запрос
        await signUpFx(signUpData);
        console.log('referrerId: ' + referrerId);

        clearInputs();
        toast.success(
          'Регистрация прошла успешно! Самое время авторизоваться.',
        );
        handleChangeMode();
      } catch (error: any) {
        console.error(error);
        toast.error(
          error.response.data.detail || 'Произошла ошибка. Повторите позже',
        );
      }
    } else {
      if (!username) {
        setUsernameError('Обязательное поле');
      }
      if (username.length > 16) {
        setUsernameError('Длина логина должна быть не больше 16 символов');
      }
      if (!password) {
        setPasswordError('Обязательное поле');
      }
      if (!repeatPassword) {
        setRepeatPasswordError('Обязательное поле');
      }
      if (password && password.length < 8) {
        setPasswordError(' ');
        setRepeatPasswordError('Длина пароля должна быть не меньше 8 символов');
      }
      if (password.length > 32) {
        setPasswordError(' ');
        setRepeatPasswordError(
          'Длина пароля должна быть не больше 32 символов',
        );
      }
      if (password !== repeatPassword && password) {
        setPasswordError(' ');
        setRepeatPasswordError('Несоответствие паролей');
      }
    }
  };

  const loginUser = async () => {
    if (
      username &&
      password &&
      username.length <= 16 &&
      password.length >= 8 &&
      password.length <= 32
    ) {
      try {
        const data = await signInFx({
          url: '/users/auth/token',
          username: username,
          password: password,
        });
        clearInputs();
        localStorage.setItem('accessToken', data.access_token);
        console.log('token: ' + data.access_token);
        toast.success('Вы успешно авторизовались');
        closeAuthModal();

        location.reload();
      } catch (error: any) {
        console.error(error);
        console.error(error.response.data.detail);
        toast.error(
          error.response.data.detail || 'Произошла ошибка. Повторите позже',
        );
      }
    } else {
      if (!username) {
        setUsernameError('Обязательное поле');
      }
      if (username.length > 16) {
        setUsernameError('Длина логина должна быть не больше 16 символов');
      }
      if (!password) {
        setPasswordError('Обязательное поле');
      }
      if (password && password.length < 8) {
        setPasswordError('Длина пароля должна быть не меньше 8 символов');
      }
      if (password.length > 32) {
        setPasswordError('Длина пароля должна быть не больше 32 символов');
      }
    }
  };

  return (
    <ModalLayout
      closeClick={handleClose}
      isOpen={modalIsOpen}
      className={styles.AuthModal}
    >
      {isSignIn ? (
        <>
          <h2>Авторизация</h2>
          <form className={styles.Form}>
            <LoginInput
              className={styles.Input}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (password.length < 16) {
                  setUsernameError('');
                }
              }}
              placeholder="Введите логин"
              error={usernameError}
            />
            <PasswordInput
              className={styles.Input}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              placeholder="Введите пароль"
              error={passwordError}
            />
          </form>
          <div className={styles.AuthButtons}>
            <button className={styles.AuthButton} onClick={loginUser}>
              Войти
            </button>
            {/*<button
              className={`${styles.AuthButton} ${styles.AuthViaSocialMedia}`}
            >
              Или
              <div className={styles.AuthViaSocialMediaIcon}>
                <VKIcon />
              </div>
            </button>*/}
          </div>
          <div className={styles.ChangeAuthMode}>
            <span>Нет аккаунта?</span>
            <button onClick={handleChangeMode}>Создать аккаунт</button>
          </div>
        </>
      ) : (
        <>
          <h2>Регистрация</h2>
          <form className={styles.Form}>
            <LoginInput
              className={styles.Input}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError('');
              }}
              placeholder="Введите логин"
              error={usernameError}
            />
            <PasswordInput
              className={styles.Input}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              placeholder="Введите пароль"
              error={passwordError}
            />
            <PasswordInput
              className={styles.Input}
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
                setRepeatPasswordError('');
              }}
              placeholder="Повторите пароль"
              error={repeatPasswordError}
            />
          </form>
          <div
            className={`${styles.AuthButtons} ${styles.RegistrationButtons}`}
          >
            <button className={styles.AuthButton} onClick={registerUser}>
              Зарегистрироваться
            </button>
            {/*<button
              className={styles.AuthViaSocialMediaIcon}
              style={{ position: 'relative' }}
            >
              <VKIcon />
            </button>*/}
          </div>
          <div className={styles.ChangeAuthMode}>
            <span>Есть аккаунт?</span>
            <button onClick={handleChangeMode}>Войти в аккаунт</button>
          </div>
        </>
      )}
    </ModalLayout>
  );
}
