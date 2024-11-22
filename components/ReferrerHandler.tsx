'use client';
import { useEffect } from 'react';

export default function ReferrerHandler() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referrerId = params.get('referrer_id');

    if (referrerId) {
      localStorage.setItem('referrer_id', referrerId);
      console.log(`Referrer ID saved: ${referrerId}`);
    }
  }, []);

  return null;
}
