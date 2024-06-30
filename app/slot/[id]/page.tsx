'use client';
import GameScreen from '@/components/modules/GameScreen';
import RelatedGames from '@/components/modules/RelatedGames';
import { slots } from '@/data/slots';
import { redirect } from 'next/navigation';
import React from 'react';
export default function SlotPage({ params }: { params: { id: string } }) {
  const slot = slots.find((item) => item.id === params.id);

  return slot ? (
    <div>
      <GameScreen slot={slot} />
      <RelatedGames isSlotPage />
    </div>
  ) : (
    redirect('/')
  );
}
