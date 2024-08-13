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
export const linkVKFx = createEffect(async (code: string) => {
  console.log('VK linking process started');
  console.log('VK Authorization Code:', code);

  const requestPayload = { code };
  console.log('Payload being sent to the server:', requestPayload);

  try {
    const response = await protectedApi.post(
      '/users/oauth/vk/link',
      requestPayload,
    );

    console.log('Request Headers:', response.headers);
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error during VK linking:');

    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }

    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: any };
      console.error('Response Status:', axiosError.response.status);
      console.error('Response Headers:', axiosError.response.headers);
      console.error('Response Data:', axiosError.response.data);
    }

    throw error;
  }
});
