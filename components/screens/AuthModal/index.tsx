'use client';
import React, { useEffect, useState } from 'react';
import ModalLayout from '@/components/layouts/ModalLayout';
import { $authModalState, closeAuthModal } from '@/context/modals';
import styles from './AuthModal.module.scss';
import { useUnit } from 'effector-react';
import PasswordInput from '@/components/elements/Inputs/PasswordInput';
import LoginInput from '@/components/elements/Inputs/LoginInput';
import { signInFx, signUpFx } from '../../../api/auth';
import { toast } from 'react-toastify';

interface AuthModalProps {
  defaultMode?: 'login' | 'registration'; // Указание начального режима
}

export default function AuthModal({ defaultMode = 'login' }: AuthModalProps) {
  const { isOpen, mode } = useUnit($authModalState);
  const [isSignIn, setIsSignIn] = useState<boolean>(defaultMode === 'login'); // Используем переданный пропс
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  console.log(isSignIn);

  const generateSimpleFingerprint = () => {
    // Используем комбинацию текущего времени, случайного числа и userAgent для генерации уникального идентификатора
    const userAgent =
      typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown';
    const timestamp = Date.now();
    const randomValue = Math.random().toString(36).substring(2, 15);

    return `fp-${btoa(`${userAgent}-${timestamp}-${randomValue}`)}`; // Кодируем в base64 для упрощения
  };

  const referrerId = localStorage.getItem('referrer_id');

  const clearInputs = () => {
    setUsername('');
    setPassword('');
    setRepeatPassword('');
    setUsernameError('');
    setPasswordError('');
    setRepeatPasswordError('');
  };

  useEffect(() => {
    const getFingerprint = async () => {
      try {
        const defaultFingerprint = localStorage.getItem('fingerprint');
        if (defaultFingerprint) {
          // Используем существующий fingerprint
          setFingerprint(defaultFingerprint);
        } else {
          // Генерируем новый fingerprint
          const newFingerprint = generateSimpleFingerprint();
          localStorage.setItem('fingerprint', newFingerprint); // Сохраняем в localStorage
          setFingerprint(newFingerprint);
        }
      } catch (error) {
        console.error('Ошибка при создании fingerprint:', error);
        const fallbackFingerprint = `fallback-${Math.random().toString(36).substring(2, 15)}`;
        setFingerprint(fallbackFingerprint); // Устанавливаем запасной fingerprint
      }
    };

    getFingerprint();
  }, []);

  useEffect(() => {
    const modalState = localStorage.getItem('authModal');
    if (modalState === 'registration') {
      setIsSignIn(false);
    } else {
      setIsSignIn(true);
    }
  }, []);

  const handleClose = () => {
    closeAuthModal();
    clearInputs();
  };

  const handleChangeMode = () => {
    setIsSignIn((prev) => !prev); // Просто переключаем локальное состояние
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
        // Убеждаемся, что fingerprint есть
        if (!fingerprint) {
          throw new Error('Fingerprint не получен');
        }

        const signUpData = {
          url: `/users/register`,
          username: username,
          password: password,
          fingerprint: fingerprint, // Используем fingerprint
        };

        if (referrerId) {
          signUpData.url += `?referrer_id=${referrerId}`;
        }

        await signUpFx(signUpData);
        clearInputs();
        toast.success(
          'Регистрация прошла успешно! Самое время авторизоваться.',
        );
        handleChangeMode();
      } catch (error: any) {
        console.error(error);
        toast.error(
          error.response?.data?.detail || 'Произошла ошибка. Повторите позже',
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
        toast.success('Вы успешно авторизовались');
        closeAuthModal();

        location.reload();
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
      isOpen={isOpen}
      className={styles.AuthModal}
    >
      {mode === 'login' ? (
        <>
          <h2>Авторизация</h2>
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
          </form>
          <div className={styles.AuthButtons}>
            <button className={styles.AuthButton} onClick={loginUser}>
              Войти
            </button>
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
          </div>
        </>
      )}
    </ModalLayout>
  );
}
