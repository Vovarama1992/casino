'use client';
import Dice from '@/components/sections/Dice';
import { useMainUnframed } from '@/hooks/useMainUnframed';
import React from 'react';
export default function DicePage() {
  useMainUnframed();

  return (
    <>
      <Dice />
    </>
  );
}
