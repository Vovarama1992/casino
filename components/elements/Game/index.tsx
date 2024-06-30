import { IGame } from '@/types/games';
import styles from './Game.module.scss';
import Link from 'next/link';
import PlayIcon from './icons/PlayIcon';
import Image from 'next/image';
import React from 'react';
export default function Game({ name, image, link }: IGame) {
  return (
    <div className={styles.Game}>
      <Image
        className={styles.Image}
        src={image}
        alt={name}
        width={0}
        height={0}
      />
      <span className={styles.Name}>{name}</span>
      <div className={styles.Inner}>
        <Link className={styles.Link} href={link}>
          <div className={styles.LinkIcon}>
            <PlayIcon />
          </div>
          Играть
        </Link>
      </div>
    </div>
  );
}
