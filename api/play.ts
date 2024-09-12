import { createEffect } from 'effector';
import { protectedApi } from './axiosClient';

// Эффект для инициализации игровой сессии
export const initGameSessionFx = createEffect(
  async ({
    game_uuid,
    player_id,
    player_name,
    currency,
    session_id,
    lobby_data = null,
    return_url = null,
    language = null,
  }: {
    game_uuid: string;
    player_id: string;
    player_name: string;
    currency: string;
    session_id: string;
    lobby_data?: string | null;
    return_url?: string | null;
    language?: string | null;
  }) => {
    // Данные передаем в теле запроса для POST
    const data = {
      game_uuid,
      player_id,
      player_name,
      currency,
      session_id,
      lobby_data,
      return_url,
      language,
    };

    const response = await protectedApi.post(
      '/providers/pragmatic/games/init',
      data, // Передаем данные в теле запроса
    );

    return response.data;
  },
);

export const getLobbyFx = createEffect(
  async ({ game_uuid, currency }: { game_uuid: string; currency: string }) => {
    const params = { game_uuid, currency };

    const response = await protectedApi.get(
      '/providers/pragmatic/games/lobby',
      { params }, // Передаем параметры в query
    );

    return response.data;
  },
);
