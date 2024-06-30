'use client';
import { useEffect } from 'react';
import { useMediaQuery } from './useMediaQuery';

export const useMainUnframed = (width: number = 480) => {
  const isMedia = useMediaQuery(width);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const mainElement = document.querySelector('.main');
      if (isMedia) {
        (mainElement as HTMLElement).style.padding = '0';
      } else {
        (mainElement as HTMLElement).style.padding = '';
      }
    }
  }, [isMedia]);
};
