'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import styles from './Banners.module.scss';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import NavigationArrow from './icons/NavigationArrow';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { openWalletModal } from '@/context/modals';
import { getUserData } from '@/api/user';
import { toast } from 'react-toastify'; // Импорт для тостов
import { useRouter } from 'next/navigation';
import { linkVKFx } from '@/api/bonus'; // Убедитесь, что этот импорт корректен
import { $user } from '@/context/user'; // Импорт Effector контекста
import { useUnit } from 'effector-react'; // Импорт Effector хука

export default function Banners() {
  const swiper = useSwiper();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const user = useUnit($user);
  const isLogin = !!user?.id;
  const router = useRouter();

  useEffect(() => {
    const checkUserAuthorization = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await getUserData({ url: '/users/me' }); // Вызов функции
          if (response.data) {
            setIsButtonDisabled(false);
          } else {
            setIsButtonDisabled(true);
          }
        } else {
          setIsButtonDisabled(true);
        }
      } catch (error) {
        console.error(error);
        setIsButtonDisabled(true);
      }
    };

    checkUserAuthorization();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    console.log('VK Authorization Code:', code);

    const processVKCode = async () => {
      if (code) {
        try {
          const response = await linkVKFx(code); // Получаем объект пользователя с VK ID
          if (response) {
            // Обновляем пользователя с новым vk_id

            toast.success('VK успешно привязан!');
            // Очищаем URL от параметров
            window.history.replaceState(null, '', window.location.pathname);
          } else {
            throw new Error('VK привязка не удалась');
          }
        } catch (error) {
          console.error('Не удалось привязать VK:', error);
          toast.error('Не удалось привязать VK. Попробуйте снова позже.');
          router.push('/'); // Перенаправление на главную при ошибке
        }
      } else if (!isLogin) {
        router.push('/'); // Перенаправление на главную, если пользователь не залогинен и нет кода
      }
    };

    processVKCode();
  }, [isLogin, router, user]);

  return (
    <section style={{ position: 'relative' }}>
      <button
        className={styles.PrevButton}
        id="banners-prev-button"
        onClick={() => swiper.slidePrev()}
      >
        <NavigationArrow />
      </button>
      <Swiper
        className={styles.Banners}
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={useMediaQuery(480) ? 1 : 2}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        navigation={{
          prevEl: '#banners-prev-button',
          nextEl: '#banners-next-button',
        }}
        pagination={{
          el: '#banners-pagination',
          clickable: true,
          bulletClass: styles.PaginationBullet,
          bulletActiveClass: styles.PaginationBulletActive,
        }}
        breakpoints={{
          769: {
            spaceBetween: '18',
          },
        }}
      >
        <SwiperSlide className={styles.Banner}>
          <div className={styles.BannerTextBox}>
            <h2 className={styles.BannerTitle}>Бонус на первый депозит</h2>
            <p className={styles.BannerDescription}>150% до 15000 р</p>
          </div>
          <button
            className={styles.BannerButton}
            onClick={() => openWalletModal()}
            disabled={isButtonDisabled} // Управляем активностью кнопки
          >
            Депозит
          </button>
        </SwiperSlide>
        <SwiperSlide className={styles.Banner}>
          <div className={styles.BannerTextBox}>
            <h2 className={styles.BannerTitle}>
              <span className={styles.BannerTitleLarge}>Провайдер</span>
              Pragmatic Play
            </h2>
            <p className={styles.BannerDescription}>Разновидные слоты</p>
          </div>
          <Link className={styles.BannerButton} href="/slots">
            Играть
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.Banner}>
          <div className={styles.BannerTextBox}>
            <h2 className={styles.BannerTitle}>Приглашай друзей и не только</h2>
            <p className={styles.BannerDescription}>и получай прибыль</p>
          </div>
          <Link className={styles.BannerButton} href="/referrals">
            Подробнее
          </Link>
        </SwiperSlide>
        <div className={styles.Pagination} id="banners-pagination"></div>
      </Swiper>
      <button
        className={styles.NextButton}
        id="banners-next-button"
        onClick={() => swiper.slideNext()}
      >
        <NavigationArrow />
      </button>
    </section>
  );
}
