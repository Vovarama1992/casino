import React from 'react';

import GameBet from '@/components/modules/GameBet';
import styles from './Dice.module.scss';
import DiceIcon from './icons/DiceIcon';
import Image from 'next/image';

export default function Dice() {
  const bets = [
    {
      title: 'Шанс:',
      buttons: ['Min', 'Max', 'X2', '/2'],
      mode: 'input',
      symbol: '%',
    },
    {
      title: 'Сумма ставки:',
      buttons: ['Min', 'Max', 'X2', '/2'],
      mode: 'input',
    },
  ];

  const result = 'lose';
  const winValue = 1250;

  return (
    <section className={styles.Dice}>
      <GameBet title="Dice" icon={<DiceIcon />} bets={bets} />
      <div className={styles.Game}>
        <div className={styles.WinningBox}>
          <span className={styles.WinningBackgroundValue}>{winValue}</span>
          <span className={styles.WinningValue}>
            {winValue}
            <Image
              src="/media/Currency.svg"
              alt="MoonCoin"
              width={0}
              height={0}
            />
          </span>
          <span className={styles.WinningInfo}>Возможный выигрыш</span>
        </div>
        <div className={styles.Buttons}>
          <div className={styles.ButtonBox}>
            0 - 799999
            <button className={styles.Button}>Меньше</button>
          </div>
          <div className={styles.ButtonBox}>
            200000 - 999999
            <button className={styles.Button}>Больше</button>
          </div>
        </div>
        <div
          className={styles.Result}
          style={{
            backgroundColor: result === 'lose' ? '#32274F' : '#BEA6FF',
          }}
        >
          {result === 'lose'
            ? 'Вы проиграли'
            : result === 'win' && 'Вы выиграли'}
        </div>
      </div>
    </section>
  );
}
