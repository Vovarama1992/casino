import { createEffect } from 'effector';
import { protectedApi } from './axiosClient';

export const claimBonusFx = createEffect(async ({ url }: { url: string }) => {
  const { data } = await protectedApi.get(url);
  return data;
});

export const checkLatestClaimBonus = createEffect(
  async ({ url }: { url: string }) => {
    const { data } = await protectedApi.get(url);
    return data;
  },
);

export const applyPromoCodeFx = createEffect(
  async ({ url, promoCode }: { url: string; promoCode: string }) => {
    const { data } = await protectedApi.post(`${url}?promo_code=${promoCode}`);
    return data;
  },
);
