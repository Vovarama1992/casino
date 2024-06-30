'use client';
import React from 'react';

import { ProfileSocialMedia } from '@/data/profile';
import styles from './Bonuses.module.scss';
import PageTitle from '@/components/elements/PageTitle';
import PromoCodeIcon from './icons/PromoCodeIcon';
import MarkIcon from './icons/MarkIcon';
import Image from 'next/image';

import Planet1 from './images/decor/planet1.png';
import Astronaut from './images/decor/astronaut.png';
import VKImage from './images/decor/vk.svg';
import TelegramImage from './images/decor/telegram.svg';
import { toast } from 'react-toastify';
import { checkLatestClaimBonus, claimBonusFx } from '@/api/bonus';
import { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import { $user, setUser } from '@/context/user';
import { CountdownTimer } from '@/components/elements/CountdownTimer';

export default function Bonuses() {
  const [bonusValue, setBonusValue] = useState<number | null>();
  const [lastClaim, setLastClaim] = useState('');
  const user = useUnit($user);

  useEffect(() => {
    const checkLatestClaim = async () => {
      try {
        const data = await checkLatestClaimBonus({
          url: '/wallet/bonus/last-earn',
        });
        setLastClaim(data);
      } catch (error) {
        console.error(error);
      }
    };

    checkLatestClaim();
  }, [bonusValue]);

  const claimBonus = async () => {
    try {
      const data = await claimBonusFx({
        url: '/wallet/bonus',
      });
      setBonusValue(data.amount);
      toast.success(
        `Поздравляем! Вы получили бонус в размере ${data.amount} лун`,
      );
      {
        user &&
          setUser({
            ...user,
            balance: data.balance,
          });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response.data.detail || 'Произошла ошибка. Повторите позже',
      );
    }
  };

  return (
    <section className={styles.Bonuses}>
      <PageTitle title="Бонусы" />
      <div className={styles.Wrapper}>
        <div className={`${styles.GetBonus} ${styles.Item}`}>
          <div className={styles.GetBonusTop}>
            <div className={styles.GetBonusTimer}>
              {lastClaim ? (
                <CountdownTimer targetDate={lastClaim} />
              ) : (
                '00:00:00'
              )}
            </div>
            <div className={styles.GetBonusTopText}>
              <h6 className={styles.GetBonusTopTitle}>Получай до 100 лун</h6>
              <p className={styles.GetBonusTopDescription}>
                Каждые 24ч, вы можете до 100 лун бесплатно.
              </p>
            </div>
          </div>
          <button className={styles.GetBonusButton} onClick={claimBonus}>
            Получить бонус
          </button>
          <Image
            className={styles.DecorImage}
            src={Planet1}
            alt="Planet"
            width={0}
            height={0}
          />
        </div>
        <div className={`${styles.LinkSocialMedia} ${styles.Item}`}>
          <h2 className={styles.LinkSocialMediaTitle}>
            Привязывайте соц.сети и получайте бонусы!
          </h2>
          <ul className={styles.SocialMediaList}>
            {ProfileSocialMedia.map((item, index) => {
              return (
                <li className={styles.SocialMediaListItem} key={index}>
                  <div className={styles.SocialMediaListItemIcon}>
                    {item.icon}
                  </div>
                  <button
                    className={`${styles.SocialMediaLinkedButton} ${styles.Button} ${item.status === 'linked' ? styles.SocialMediaLinkedButtonActive : ''}`}
                  >
                    {item.status === 'linked' ? 'Привязано' : 'Привязать'}
                  </button>
                </li>
              );
            })}
          </ul>
          <Image
            className={`${styles.DecorImage} ${styles.DecorImageAstronaut}`}
            src={Astronaut}
            alt="Astronaut"
            width={0}
            height={0}
          />
          <Image
            className={`${styles.DecorImage} ${styles.DecorImagePlanet}`}
            src={Planet1}
            alt="Planet"
            width={0}
            height={0}
          />

          <div className={styles.LinkSocialMediaDecorBackground}>
            <Image
              className={styles.DecorImage}
              src={VKImage}
              alt="VK"
              width={0}
              height={0}
            />
            <Image
              className={styles.DecorImage}
              src={TelegramImage}
              alt="Telegram"
              width={0}
              height={0}
            />
          </div>
        </div>
        <div className={`${styles.PromoCode} ${styles.Item}`}>
          <div className={styles.PromoCodeTop}>
            <div className={styles.PromoCodeTopText}>
              <h4 className={styles.PromoCodeTopTitle}>Промокод</h4>
              <p className={styles.PromoCodeTopDescription}>
                <span>У вас есть промокод?</span>
                <span>Введите его в поле ниже</span>
              </p>
            </div>
            <div className={styles.PromoCodeIcon}>
              <PromoCodeIcon />
            </div>
          </div>
          <div className={styles.PromoCodeInputBox}>
            <input
              type="text"
              className={styles.PromoCodeInput}
              placeholder="DSAJ5H8SF"
            />
            <div className={styles.PromoCodeInputIcon}>
              <PromoCodeIcon color="#3A1F76" />
            </div>
            <div className={styles.PromoCodeInputButton}>
              <MarkIcon />
            </div>
          </div>
          <button className={styles.PromoCodeButton}>Активировать</button>
          <Image
            className={styles.DecorImage}
            src={Planet1}
            alt="Planet"
            width={0}
            height={0}
          />
        </div>
      </div>
    </section>
  );
}
