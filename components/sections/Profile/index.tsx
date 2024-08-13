'use client';
import React from 'react';

import { useState } from 'react';
import PageTitle from '@/components/elements/PageTitle';
import styles from './Profile.module.scss';
import Image from 'next/image';
import PasswordInput from '@/components/elements/Inputs/PasswordInput';
import { ProfileSocialMedia } from '@/data/profile';
import Link from 'next/link';
import { useUnit } from 'effector-react';
import { $user, setUser } from '@/context/user';
import { formatDate } from '@/utils/formatDate';

import Decor1 from './images/decor/1.png';
import Decor2 from './images/decor/2.png';
import Decor3 from './images/decor/3.png';
import Decor4 from './images/decor/4.png';
import Decor5 from './images/decor/5.png';
import Decor6 from './images/decor/6.png';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { getUserData, updateAvatar, updatePassword } from '@/api/user';
import { avatars } from '@/data/avatar';
import Avatar from '@/components/elements/Avatar';

export default function Profile() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const user = useUnit($user);
  const [avatarId, setAvatarId] = useState<number | null>(
    user && +user?.avatar,
  );

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    redirect('');
  };

  const changePassword = async () => {
    if (oldPassword && newPassword) {
      let isValid = true;

      if (oldPassword === newPassword) {
        toast.warning('Пароль не должен повторяться');
        isValid = false;
      }

      if (newPassword.length < 8) {
        toast.error('Новый пароль не должен быть меньше 8 символов');
        isValid = false;
      }

      if (newPassword.length > 32) {
        toast.error('Новый пароль не должен быть больше 32 символов');
        isValid = false;
      }

      if (isValid) {
        try {
          await updatePassword({
            url: '/users/me/update-password',
            old_password: oldPassword,
            new_password: newPassword,
          });
          setOldPassword('');
          setNewPassword('');
          toast.success('Пароль успешно изменён!');
        } catch (error: any) {
          console.error(error);
          toast.error(
            error.response?.data?.detail || 'Произошла ошибка. Повторите позже',
          );
        }
      }
    } else {
      toast.error('Заполните поля');
    }
  };

  const changeAvatar = async () => {
    if (avatarId) {
      try {
        await updateAvatar({
          url: `/users/me/update-avatar?avatar_id=${avatarId}`,
        });
        const { data } = await getUserData({
          url: '/users/me',
        });
        setUser({
          ...data,
          avatar: String(avatarId),
        });
        toast.success('Аватар изменён');
      } catch (error: any) {
        console.error(error);
        toast.error(
          error.response?.data?.detail || 'Произошла ошибка. Повторите позже',
        );
      }
    } else {
      toast.error('Выберите аватар');
    }
  };

  return (
    <section className={styles.Profile}>
      <PageTitle title="Профиль" />
      <div className={styles.Wrapper}>
        <div className={styles.Top}>
          <div className={`${styles.Info} ${styles.Item}`}>
            <div className={styles.ProfileData}>
              <Avatar className={styles.ProfileAvatar} />
              <h3 className={styles.ProfileName}>
                {user?.fullname || user?.username}
              </h3>
              {user?.created_at && (
                <span className={styles.ProfileDate}>
                  На сайте с {formatDate(user.created_at)}
                </span>
              )}
            </div>
            <button
              className={`${styles.LogoutButton} ${styles.Button}`}
              onClick={handleLogout}
            >
              Выйти
            </button>
            <Image
              className={styles.DecorImage}
              src={Decor1}
              alt="Decor"
              width={0}
              height={0}
            />
          </div>
          <div className={`${styles.Settings} ${styles.Item}`}>
            <h3 className={styles.Title}>Настройки профиля</h3>
            <div className={styles.SettingForm}>
              <h4 className={styles.SettingFormTitle}>Смена пароля</h4>
              <PasswordInput
                className={styles.SettingFormInput}
                buttonClassName={styles.SettingFormInputButton}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Введите текущий пароль"
              />
              <PasswordInput
                value={newPassword}
                buttonClassName={styles.SettingFormInputButton}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Введите новый пароль"
                className={styles.SettingFormInput}
              />
              <button
                className={`${styles.SettingFormButton} ${styles.Button}`}
                onClick={changePassword}
              >
                Сменить пароль
              </button>
            </div>
          </div>
          <div className={`${styles.SocialMedia} ${styles.Item}`}>
            <h3 className={styles.Title}>Привязка соц. сетей</h3>
            <ul className={styles.SocialMediaList}>
              {ProfileSocialMedia.map((item, index) => {
                return (
                  <li className={styles.SocialMediaListItem} key={index}>
                    <div className={styles.SocialMediaListItemIcon}>
                      {item.icon}
                    </div>
                    <button
                      className={`${styles.SocialMediaLinkedButton} ${styles.Button} ${item.status === 'linked' ? styles.SocialMediaLinkedButtonActive : ''}`}
                      onClick={() => (window.location.href = item.authUrl)}
                    >
                      {user?.is_vk_linked || user?.vk_id
                        ? 'Привязано'
                        : 'Привязать'}
                    </button>
                  </li>
                );
              })}
            </ul>
            <span className={styles.SocialMediaInfo}>
              После привязки всех соц.сетей вы получаете 10 лун на свой основной
              баланс
            </span>
            <Image
              className={styles.DecorImage}
              src={Decor2}
              alt="Decor"
              width={0}
              height={0}
            />
          </div>
        </div>
        <div className={styles.Bottom}>
          <div className={`${styles.AvatarChange} ${styles.Item}`}>
            <h2 className={styles.Title}>Смена аватара</h2>
            <span className={styles.Description}>
              Пользовательские аватарки на ваш вкус
            </span>
            <div className={styles.AvatarChangeMain}>
              <ul className={styles.AvatarList}>
                {avatars.map((avatar, index) => {
                  return (
                    // eslint-disable-next-line react/jsx-key, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
                    <li
                      className={`${styles.Avatar} ${avatarId == index + 1 ? styles.AvatarSelect : ''}`}
                      onClick={() => setAvatarId(index + 1)}
                    >
                      <Image
                        src={avatar.url}
                        alt="Avatar"
                        width={0}
                        height={0}
                      />
                    </li>
                  );
                })}
              </ul>
              <button
                className={`${styles.ChangeButton} ${styles.Button}`}
                onClick={changeAvatar}
              >
                Изменить
              </button>
            </div>
          </div>
          <div className={`${styles.Questions} ${styles.Item}`}>
            <h3 className={styles.Title}>Если у вас есть вопросы</h3>
            <div className={styles.QuestionsLinks}>
              <Link
                href="/faq"
                className={`${styles.QuestionsLink} ${styles.Link}`}
              >
                FAQ
              </Link>
              <Link
                href="/support"
                className={`${styles.QuestionsLink} ${styles.Link}`}
              >
                Поддержка
              </Link>
            </div>
            <span className={styles.Description}>
              С наилучшими пожеланиями - MoonGamble ♥
            </span>
          </div>
        </div>
        <div className={styles.MobileDecor}>
          <Image
            className={styles.DecorImage}
            src={Decor3}
            alt="Decor"
            width={0}
            height={0}
          />
          <Image
            className={styles.DecorImage}
            src={Decor4}
            alt="Decor"
            width={0}
            height={0}
          />
          <Image
            className={styles.DecorImage}
            src={Decor5}
            alt="Decor"
            width={0}
            height={0}
          />
          <Image
            className={styles.DecorImage}
            src={Decor6}
            alt="Decor"
            width={0}
            height={0}
          />
        </div>
      </div>
    </section>
  );
}
