import { createEffect } from 'effector';
import { api } from './axiosClient';
import type { ISignInFx, ISignUpFx } from '@/types/auth';

export const signUpFx = createEffect(
  async ({ url, username, password, fingerprint }: ISignUpFx) => {
    const formData = new FormData();
    console.log('user: ' + username);

    formData.append('username', username);
    formData.append('password', password);
    formData.append('fingerprint', fingerprint);
    const data = await api.post(url, formData);
    console.log('data: ' + data);
    return data;
  },
);

export const signInFx = createEffect(
  async ({ url, username, password }: ISignInFx) => {
    const formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    const { data } = await api.post(url, formData);
    console.log('data: ' + data);
    return data;
  },
);
