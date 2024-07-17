import { createEffect } from 'effector';
import { api, protectedApi } from './axiosClient';

export const getTickets = createEffect(async ({ url }: { url: string }) => {
  console.log('Requesting:', url);
  const { data } = await protectedApi.get(url);
  return data;
});

export const getTicket = createEffect(async ({ url }: { url: string }) => {
  const { data } = await protectedApi.get(url);

  return data;
});

export const generateChat = createEffect(async ({ url }: { url: string }) => {
  const { data } = await api.get(url);

  return data;
});

export const createTicket = createEffect(
  async ({
    url,
    subject,
    message,
  }: {
    url: string;
    subject: string;
    message: string;
  }) => {
    const { data } = await protectedApi.post(url, {
      subject: subject,
      message: message,
    });

    return data;
  },
);
