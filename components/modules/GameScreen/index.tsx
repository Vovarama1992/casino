'use client';
import React from 'react';

import { ISlot } from '@/types/games';
import styles from './GameScreen.module.scss';
import BackArrowIcon from './icons/BackArrowIcon';
import ViewIcon from './icons/ViewIcon';
import FullScreenIcon from './icons/FullScreenIcon';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PlayIcon from './icons/PlayIcon';
import DemoIcon from './icons/DemoIcon';

export default function GameScreen({ slot }: { slot: ISlot }) {
  const router = useRouter();

  return (
    <div className={styles.GameScreen}>
      <div className={styles.Header}>
        <button className={styles.BackButton} onClick={router.back}>
          <BackArrowIcon /> Назад
        </button>
        <h3 className={styles.Title}>
          {slot.provider} - {slot.name}
        </h3>
        <div className={styles.Buttons}>
          <Link href={`/slot/demo/${slot.id}`} className={styles.Button}>
            <ViewIcon />
          </Link>
          <button className={styles.Button}>
            <FullScreenIcon />
          </button>
        </div>
      </div>
      <div className={styles.Main}>
        <div className={styles.MobileButtons}>
          <button className={styles.MobileButton}>
            <PlayIcon />
          </button>
          <Link href={`/slot/demo/${slot.id}`} className={styles.MobileButton}>
            <DemoIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
