import { createEffect } from 'effector';
import { api, protectedApi } from './axiosClient';

export const getTickets = createEffect(async ({ url }: { url: string }) => {
  console.log('Requesting:', url);
  const { data } = await protectedApi.get(url);
  return data;
});

export const getMessages = createEffect(async ({ id }: { id: number }) => {
  const { data } = await protectedApi.get(
    `https://api.moon-gamble.fans/tickets/messages/${id}/`,
  );

  const messages = data.map((d: any) => d.content);
  return messages;
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
