'use client';
import React, { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import { $user } from '@/context/user';
import { initGameSessionFx, getLobbyFx } from '@/api/play';
import { ISlot } from '@/types/games';

export default function GameScreen({ slot }: { slot: ISlot }) {
  const user = useUnit($user);
  const [isLoading, setIsLoading] = useState(false);
  const [gameUrl, setGameUrl] = useState<string | null>(null); // URL для игры

  // Автоматическая инициализация игры при рендере компонента
  useEffect(() => {
    const initializeGame = async () => {
      setIsLoading(true);

      try {
        let lobbyData = null;

        // Проверяем, есть ли у игры лобби
        if (slot.has_lobby) {
          const lobbyResponse = await getLobbyFx({
            game_uuid: slot.id,
            currency: 'EUR',
          });
          lobbyData = lobbyResponse.lobbyData;
        }

        const sessionId = `session-${Date.now()}`;

        // Инициализация игровой сессии
        const gameSessionResponse = await initGameSessionFx({
          game_uuid: slot.id,
          player_id: String(user?.id),
          player_name: String(user?.username),
          currency: 'EUR',
          session_id: sessionId,
          lobby_data: lobbyData, // Если есть лобби, передаем данные
        });

        // Устанавливаем URL игры
        setGameUrl(gameSessionResponse.url);
      } catch (error) {
        console.error('Ошибка при запуске игры:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeGame(); // Запускаем игру сразу при рендеринге
  }, [slot, user]);

  return (
    <div>
      {isLoading ? (
        <p>Загрузка игры...</p>
      ) : gameUrl ? (
        <iframe
          src={gameUrl}
          width="100%"
          height="600"
          frameBorder="0"
          allowFullScreen
          title="Game Screen"
        ></iframe>
      ) : (
        <p>Не удалось загрузить игру.</p>
      )}
    </div>
  );
}
