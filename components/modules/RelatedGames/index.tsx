import React from 'react';

import Slot from '@/components/elements/Slot';
import styles from './RelatedGames.module.scss';
import { slots } from '@/data/slots';

export default function RelatedGames({ isSlotPage }: { isSlotPage?: boolean }) {
  return (
    <div
      className={`${styles.RelatedGames} ${isSlotPage ? styles.RelatedGamesSlotPage : ''}`}
    >
      <h2 className={styles.Title}>Похожие игры</h2>
      <div className={styles.List}>
        {slots.slice(0, 5).map((slot, index) => {
          return (
            <Slot
              name={slot.name}
              provider={slot.provider}
              image={slot.image}
              id={slot.id}
              key={index}
              className={styles.Slot}
            />
          );
        })}
      </div>
    </div>
  );
}
