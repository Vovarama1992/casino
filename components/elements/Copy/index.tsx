import { config } from '@/data/config';
import CopyrightIcon from './icons/CopyrightIcon';
import styles from './Copy.module.scss';
import React from 'react';

export default function Copy() {
  const nowYear = new Date().getFullYear();

  return (
    <span className={styles.Copy}>
      <CopyrightIcon /> {config.name} {nowYear}
    </span>
  );
}
