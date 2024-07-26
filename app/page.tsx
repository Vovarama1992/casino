import Banners from '@/components/sections/Banners';
import Games from '@/components/sections/Games';
import React from 'react';
export default function MainPage() {
  return (
    <>
      <Banners />
      <Games isSlotsPage />
    </>
  );
}
