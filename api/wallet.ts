import { createEffect } from 'effector';
import { protectedApi } from './axiosClient';

// Получение истории транзакций
export const getWalletHistory = createEffect(
  async ({ url }: { url: string }) => {
    const { data } = await protectedApi.get(url);
    return data;
  },
);

// Создание депозита
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

// Создание заявки на вывод
export const createWithdrawal = createEffect(
  async ({
    url,
    paymentSystem,
    amount,
    user_id, // добавляем user_id
  }: {
    url: string;
    paymentSystem: string;
    amount: number;
    user_id: number; // добавляем user_id в типизацию
  }) => {
    const { data } = await protectedApi.post(url, {
      payment_system: paymentSystem,
      amount: amount,
      user_id: user_id, // передаем user_id в запросе
    });
    return data;
  },
);

// Создание бонусного депозита
export const createBonusDeposit = createEffect(
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

// Получение всех заявок на вывод средств со статусом PENDING
export const getPendingWithdrawals = createEffect(
  async ({ url }: { url: string }) => {
    const { data } = await protectedApi.get(url);
    return data;
  },
);

// Одобрение заявки на вывод средств по ID
export const approveWithdrawal = createEffect(
  async ({ url, withdrawalId }: { url: string; withdrawalId: number }) => {
    const { data } = await protectedApi.post(
      `${url}?transaction_id=${withdrawalId}`,
    );
    return data;
  },
);

// Отклонение заявки на вывод средств по ID
export const rejectWithdrawal = createEffect(
  async ({ url, withdrawalId }: { url: string; withdrawalId: number }) => {
    const { data } = await protectedApi.post(
      `${url}?transaction_id=${withdrawalId}`,
    );
    return data;
  },
);

export const getLastWithdrawalAttempt = createEffect(
  async ({ url }: { url: string }) => {
    const { data } = await protectedApi.get(url);
    return data;
  },
);
