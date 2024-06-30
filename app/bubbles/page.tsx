'use client';
import Bubbles from '../../components/sections/Bubbles';
import { useMainUnframed } from '../../hooks/useMainUnframed';
import React from 'react';
export default function BubblesPage() {
  useMainUnframed();

  return (
    <>
      <Bubbles />
    </>
  );
}
