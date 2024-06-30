import { ISlot } from '@/types/games';
import styles from './Slot.module.scss';
import Link from 'next/link';
import DemoIcon from './icons/DemoIcon';
import PlayIcon from './icons/PlayIcon';
import React from 'react';
export default function Slot({ name, provider, image, id, className }: ISlot) {
  return (
    <div
      className={`${styles.Slot} ${className || ''}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.Inner}>
        <span className={styles.Provider}>{provider}</span>
        <div className={styles.Links}>
          <Link className={styles.Link} href={`/slot/${id}`}>
            <PlayIcon />
          </Link>
          <Link className={styles.Link} href={`/slot/demo/${id}`}>
            <DemoIcon />
          </Link>
        </div>
        <span className={styles.Name}>{name}</span>
      </div>
    </div>
  );
}
