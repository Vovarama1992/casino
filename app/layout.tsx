import type { Metadata } from 'next';
import ReferrerHandler from '@/components/ReferrerHandler';
import localFont from 'next/font/local';
import '@/public/styles/globals.scss';
import Layout from '@/components/layouts/Layout';
import { config } from '@/data/config';
import React from 'react';
const moon = localFont({
  src: [
    {
      path: '../public/fonts/HalvarBreit-Rg.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/HalvarBreit-Md.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/HalvarBreit-Bd.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/HalvarBreit-XBd.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-moon',
});

export const metadata: Metadata = {
  title: `${config.name}`,
  icons: {
    icon: '/media/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={moon.variable}>
        <ReferrerHandler />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
