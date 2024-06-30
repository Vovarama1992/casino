import { createEffect } from 'effector';
import { protectedApi } from './axiosClient';

export const getWalletHistory = createEffect(
  async ({ url }: { url: string }) => {
    const { data } = await protectedApi.get(url);

    return data;
  },
);

export const createDeposit = createEffect(
  async ({
    url,
    paymentSystem,
    amount,
  }: {
    url: string;
    paymentSystem: string;
    amount: number;
  }) => {
    const { data } = await protectedApi.post(url, {
      payment_system: paymentSystem,
      amount: amount,
    });

    return data;
  },
);

export const createWithdrawal = createEffect(
  async ({
    url,
    paymentSystem,
    amount,
  }: {
    url: string;
    paymentSystem: string;
    amount: number;
  }) => {
    const { data } = await protectedApi.post(url, {
      payment_system: paymentSystem,
      amount: amount,
    });

    return data;
  },
);
