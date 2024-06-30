import { createEffect } from 'effector';
import { protectedApi } from './axiosClient';

export const getUserData = createEffect(async ({ url }: { url: string }) => {
  const { data } = await protectedApi.get(url);

  return { data };
});

export const getUserBalance = createEffect(async ({ url }: { url: string }) => {
  const { data } = await protectedApi.get(url);

  return data;
});

export const updatePassword = createEffect(
  async ({
    url,
    old_password,
    new_password,
  }: {
    url: string;
    old_password: string;
    new_password: string;
  }) => {
    const formData = new FormData();

    formData.append('old_password', old_password);
    formData.append('new_password', new_password);

    const { data } = await protectedApi.patch(url, formData);

    return data;
  },
);

export const updateAvatar = createEffect(async ({ url }: { url: string }) => {
  const { data } = await protectedApi.patch(url);

  return data;
});

export const getReferralStatsFx = createEffect(
  async ({ url }: { url: string }) => {
    const { data } = await protectedApi.get(url);

    return data;
  },
);
