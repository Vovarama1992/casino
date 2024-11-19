'use client';
import React, { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import { $user } from '@/context/user';
import { initGameSessionFx, getLobbyFx } from '@/api/play'; // Импортируем getGamesFx
import { ISlot } from '@/types/games';

export default function GameScreen({ slot }: { slot: ISlot }) {
  const user = useUnit($user);
  const [isLoading, setIsLoading] = useState(false);
  const [gameUrl, setGameUrl] = useState<string | null>(null); // URL для игры
  //const [games, setGames] = useState([]); // Добавляем состояние для списка игр

  // Автоматическая инициализация игры при рендере компонента
  useEffect(() => {
    {
      /*const fetchGames = async () => {
      try {
        const gamesResponse = await getGamesFx(); // Запрашиваем список игр
        setGames(gamesResponse); // Сохраняем список игр в состояние
        console.log(
          'Список игр:',
          gamesResponse.items.map((game: any) => game.name),
        ); // Выводим список в консоль
      } catch (error) {
        console.error('Ошибка при получении списка игр:', error);
      }
    };

    fetchGames();
    console.log(games[1]);*/
    }

    const initializeGame = async () => {
      setIsLoading(true);

      try {
        let lobbyData = null;

        // Проверяем, есть ли у игры лобби
        if (slot.has_lobby) {
          const lobbyResponse = await getLobbyFx({
            game_uuid: '23ca989db9ca5ad94dbca17fa54a123f3f7efc9d',
            currency: 'EUR',
          });
          lobbyData = lobbyResponse.lobbyData;
        }

        const sessionId = `session-${Date.now()}`;

        // Инициализация игровой сессии
        const gameSessionResponse = await initGameSessionFx({
          game_uuid: '23ca989db9ca5ad94dbca17fa54a123f3f7efc9d',
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
