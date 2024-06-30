'use client';
import React from 'react';

import styles from './Mines.module.scss';
import GameBet from '@/components/modules/GameBet';
import MinesIcon from './icons/MinesIcon';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import NavigationArrow from './icons/NavigationArrow';
import 'swiper/css';
import Image from 'next/image';

import PlanetImage from './images/planet.png';
import AstronautImage from './images/astronaut.png';
import { useState } from 'react';

export default function Mines() {
  const swiper = useSwiper();

  const bets = [
    {
      title: 'Количество космонавтов',
      buttons: ['2', '5', '10', '24'],
      mode: 'edit',
    },
    {
      title: 'Сумма ставки',
      buttons: ['Min', 'Max', 'X2', '/2'],
      mode: 'input',
    },
  ];

  const steps = [
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
    'x1.04',
  ];

  const cells = [
    'win',
    'lose',
    'win',
    'win',
    'win',
    'win',
    'win',
    'lose',
    'win',
    'win',
    'win',
    'win',
    'win',
    'win',
    'win',
    'lose',
    'lose',
    'win',
    'win',
    'win',
    'win',
    'win',
    'win',
    'lose',
    'win',
  ];

  return (
    <section className={styles.Mines}>
      <GameBet title="Mines" icon={<MinesIcon />} betButton bets={bets} />
      <div className={styles.Game}>
        <div className={styles.Main}>
          <div className={`${styles.SymbolBox} ${styles.SymbolBoxWin}`}>
            <div className={styles.SymbolBoxCard}>
              <Image src={PlanetImage} alt="Planet" width={0} height={0} />
              <span>22</span>
            </div>
            <span className={styles.SymbolBoxInfo}>
              Луна - выигрышный символ
            </span>
          </div>
          <div className={styles.Cells}>
            {cells.map((cell, index) => {
              const [openCell, setOpenCell] = useState<number>();
              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div
                  className={`${styles.Cell} ${openCell ? styles.CellActive : ''}`}
                  onClick={() => setOpenCell(index + 1)}
                  key={index}
                >
                  <Image
                    src={cell === 'lose' ? AstronautImage : PlanetImage}
                    alt={cell === 'lose' ? 'Astronaut' : 'Planet'}
                    width={0}
                    height={0}
                  />
                </div>
              );
            })}
          </div>
          <div className={`${styles.SymbolBox} ${styles.SymbolBoxLose}`}>
            <div className={styles.SymbolBoxCard}>
              <Image
                src={AstronautImage}
                alt="Astronaut"
                width={0}
                height={0}
              />
              <span>3</span>
            </div>
            <span className={styles.SymbolBoxInfo}>
              Космонавт - проигрышный символ
            </span>
          </div>
        </div>
        <div className={styles.GameSteps}>
          <button
            className={styles.PrevButton}
            id="steps-prev-button"
            onClick={() => swiper.slidePrev()}
          >
            <NavigationArrow />
          </button>
          <Swiper
            className={styles.GameStepList}
            modules={[Navigation]}
            spaceBetween={6}
            slidesPerView="auto"
            slidesPerGroup={1}
            navigation={{
              prevEl: '#steps-prev-button',
              nextEl: '#steps-next-button',
            }}
          >
            {steps.map((step, index) => {
              return (
                <SwiperSlide className={styles.GameStep} key={index}>
                  <span>{index + 1} шаг</span>
                  <span>{step}</span>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button
            className={styles.NextButton}
            id="steps-next-button"
            onClick={() => swiper.slideNext()}
          >
            <NavigationArrow />
          </button>
        </div>
      </div>
    </section>
  );
}
