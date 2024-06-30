'use client';

import React from 'react';

import GameBet from '@/components/modules/GameBet';
import styles from './Bubbles.module.scss';
import BubblesIcon from './icons/BubblesIcon';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import Astronaut from './images/astronaut.png';

export default function Bubbles() {
  const bets = [
    {
      title: 'Сумма ставки:',
      buttons: ['Min', 'Max', 'X2', '/2'],
      mode: 'input',
    },
    {
      title: 'Цель:',
      buttons: ['X1.5', 'X2', 'X5', 'X10'],
      mode: 'input',
    },
    {
      title: 'Шанс:',
      buttons: ['Min', 'Max', 'X2', '/2'],
      mode: 'input',
      symbol: '%',
    },
  ];

  const history = ['5x', '5x', '5x', '5x', '5x', '5x', '5x'];

  const maxHistoryItems = useMediaQuery(1440) ? 6 : 7;

  return (
    <section className={styles.Bubbles}>
      <GameBet title="Bubbles" icon={<BubblesIcon />} betButton bets={bets} />
      <div className={styles.Game}>
        <ul className={styles.HistoryList}>
          <li
            className={`${styles.HistoryListItem} ${styles.HistoryListItemTitle}`}
          >
            История игр
          </li>
          {history.slice(0, maxHistoryItems).map((item, index) => {
            return (
              <li className={styles.HistoryListItem} key={index}>
                {item}
              </li>
            );
          })}
        </ul>
        <Image
          className={styles.Astronaut}
          src={Astronaut}
          alt="Astronaut"
          width={0}
          height={0}
        />
        <div className={styles.GameResult}>1.5x</div>
      </div>
    </section>
  );
}
