import React from 'react';

import styles from './SearchGames.module.scss';
import SearchIcon from './icons/SearchIcon';

export default function SearchGames() {
  return (
    <div className={styles.SearchGames}>
      <input className={styles.Input} type="text" placeholder="Поиск игр..." />
      <SearchIcon />
    </div>
  );
}
