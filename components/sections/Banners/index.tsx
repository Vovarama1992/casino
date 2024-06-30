'use client';
import React from 'react';

import Link from 'next/link';
import styles from './Banners.module.scss';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import NavigationArrow from './icons/NavigationArrow';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { openWalletModal } from '@/context/modals';

export default function Banners() {
  const swiper = useSwiper();

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
