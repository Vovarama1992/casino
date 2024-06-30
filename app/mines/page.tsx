'use client';
import Mines from '@/components/sections/Mines';
import { useMainUnframed } from '@/hooks/useMainUnframed';
import React from 'react';
export default function MinesPage() {
  useMainUnframed();

  return (
    <>
      <Mines />
    </>
  );
}
