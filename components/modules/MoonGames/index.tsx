import React from 'react';

import { games } from '@/data/slots';
import styles from './MoonGames.module.scss';
import Game from '@/components/elements/Game';

export default function MoonGames({ className }: { className?: string }) {
  return (
    <div className={styles.MoonGames}>
      <h2 className={className || ''}>Moon Games</h2>
      <div className={styles.GameList}>
        {games.map((game, index) => {
          return (
            <Game
              name={game.name}
              image={game.image}
              link={game.link}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
