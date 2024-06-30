import React from 'react';

import SearchGames from '@/components/modules/Searches/SearchGames';
import styles from './Games.module.scss';
import MoonGames from '@/components/modules/MoonGames';
import Slots from '@/components/modules/Slots';

export default function Games({ isSlotsPage }: { isSlotsPage?: boolean }) {
  return (
    <section className={styles.Games}>
      <SearchGames />
      {!isSlotsPage && <MoonGames className={styles.MoonGames} />}
      <Slots className={styles.Slots} isSlotsPage />
    </section>
  );
}
