'use client';
import React, { useState, useEffect } from 'react';

import { ProfileSocialMedia } from '@/data/profile';
import styles from './Bonuses.module.scss';
import PageTitle from '@/components/elements/PageTitle';
import { createBonusDeposit } from '@/api/wallet';
import PromoCodeIcon from './icons/PromoCodeIcon';
import MarkIcon from './icons/MarkIcon';
import Image from 'next/image';
import Planet1 from './images/decor/planet1.png';
import Astronaut from './images/decor/astronaut.png';
import VKImage from './images/decor/vk.svg';
import TelegramImage from './images/decor/telegram.svg';
import { toast } from 'react-toastify';
import {
  checkLatestClaimBonus,
  claimBonusFx,
  applyPromoCodeFx,
  //linkVKFx, // Импортируем созданный эффект
} from '@/api/bonus';
import { useUnit } from 'effector-react';
import { $user, setUser } from '@/context/user';
import CountdownTimer from '@/components/elements/CountdownTimer';

export default function Bonuses() {
  const user = useUnit($user);
  const [bonusValue, setBonusValue] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string>('');
  const [isVKLinked, setIsVKLinked] = useState<boolean>(!!user?.vk_id);

  console.log(bonusValue);
  useEffect(() => {
    const checkLatestClaim = async () => {
      try {
        console.log('Checking latest claim...');
        const data = await checkLatestClaimBonus({
          url: '/wallet/bonus/last-earn',
        });
        console.log('Latest claim data:', data);
        setTimeLeft(calculateTimeLeft(data.created_at));
      } catch (error) {
        console.error('Error checking latest claim:', error);
        setTimeLeft(0);
      }
    };

    const calculateTimeLeft = (lastClaimTime: string) => {
      const now = new Date().toISOString(); // текущая дата и время в UTC
      const lastClaimDate = new Date(lastClaimTime).toISOString(); // переводим полученную дату в UTC
      const nextClaimDate =
        new Date(lastClaimDate).getTime() + 24 * 60 * 60 * 1000;
      const timeDifference = nextClaimDate - new Date(now).getTime();
      console.log('Time left calculation:', {
        now,
        lastClaimDate,
        nextClaimDate,
        timeDifference,
      });
      return timeDifference > 0 ? Math.floor(timeDifference / 1000) : 0;
    };

    const init = async () => {
      console.log('Initializing VK link check and bonus claim...');

      // Проверяем состояние VK привязки
      if (user?.vk_id || user?.is_vk_linked) {
        console.log('VK is already linked.');
        setIsVKLinked(true);
      } else {
        console.log('VK is not linked.');
        setIsVKLinked(false);
      }

      // Проверка бонусов
      await checkLatestClaim();
    };

    const checkVKCode = () => {
      console.log('Checking VK code...');
      const urlParams = new URLSearchParams(window.location.search);
      const vkCode = urlParams.get('code');
      if (vkCode) {
        console.log('VK code found:', vkCode);
        setIsVKLinked(true);
        toast.success('VK успешно привязан!');
        window.history.replaceState(null, '', window.location.pathname); // Убираем параметры из URL
      } else {
        console.log('No VK code in URL.');
      }
    };

    checkVKCode();
    init();
  }, []);

  const claimBonus = async () => {
    try {
      const data = await claimBonusFx({
        url: '/wallet/bonus',
      });
      setBonusValue(data.amount);
      setTimeLeft(24 * 60 * 60); // Сброс таймера на 24 часа после получения бонуса
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

  const applyPromoCode = async () => {
    try {
      const data = await applyPromoCodeFx({
        url: '/wallet/apply_promo_code',
        promoCode: promoCode,
      });

      toast.success(`Промокод успешно применен: ${data.amount} лун`);

      if (user) {
        setUser({
          ...user,
          bonus_balance: user.bonus_balance + data.amount,
          balance: user.balance + data.amount,
        });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response.data.detail ||
          'Не удалось применить промокод. Попробуйте снова позже.',
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
              <CountdownTimer timeLeft={timeLeft} />
            </div>
            <div className={styles.GetBonusTopText}>
              <h6 className={styles.GetBonusTopTitle}>Получай до 100 лун</h6>
              <p className={styles.GetBonusTopDescription}>
                Каждые 24ч, вы можете до 100 лун бесплатно.
              </p>
            </div>
          </div>
          <button
            className={styles.GetBonusButton}
            onClick={claimBonus}
            disabled={timeLeft > 0}
          >
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
            {ProfileSocialMedia.map((item, index) => (
              <li className={styles.SocialMediaListItem} key={index}>
                <div className={styles.SocialMediaListItemIcon}>
                  {item.icon}
                </div>
                <button
                  disabled={!!user?.vk_id || !!user?.is_vk_linked}
                  onClick={async () => {
                    if (item.name === 'VK') {
                      console.log('vk_url: ' + item.authUrl);

                      await createBonusDeposit({
                        url: '/wallet/bonus-deposit',
                        paymentSystem: 'internal', // Укажите систему платежей
                        amount: 10, // Сумма бонуса
                      });

                      window.location.href = item.authUrl;
                    } else if (item.name === 'Telegram') {
                      try {
                        const response = await fetch(
                          '/users/oauth/telegram/link',
                          {
                            method: 'GET',
                          },
                        );
                        if (response.ok) {
                          toast.success('Telegram успешно привязан!');
                        } else {
                          throw new Error('Failed to link Telegram');
                        }
                      } catch (error) {
                        console.error(error);
                        toast.error(
                          'Не удалось привязать Telegram. Попробуйте снова позже.',
                        );
                      }
                    }
                  }}
                  className={`${styles.SocialMediaLinkedButton} ${styles.Button} ${
                    item.name === 'VK' && isVKLinked
                      ? styles.SocialMediaLinkedButtonActive
                      : ''
                  }`}
                >
                  {user?.is_vk_linked || user?.vk_id || isVKLinked
                    ? 'Привязано'
                    : 'Привязать'}
                </button>
              </li>
            ))}
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
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <div className={styles.PromoCodeInputIcon}>
              <PromoCodeIcon color="#3A1F76" />
            </div>
            <button
              className={styles.PromoCodeInputButton}
              onClick={applyPromoCode}
            >
              <MarkIcon />
            </button>
          </div>
          <button className={styles.PromoCodeButton} onClick={applyPromoCode}>
            Активировать
          </button>
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
