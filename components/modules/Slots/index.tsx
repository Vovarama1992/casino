'use client';

import React from 'react';

import { slots } from '@/data/slots';
import styles from './Slots.module.scss';
import Slot from '@/components/elements/Slot';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useState } from 'react';

export default function Slots({
  className,
  isSlotsPage,
}: {
  className?: string;
  isSlotsPage?: boolean;
}) {
  const isMedia2400 = useMediaQuery(2400);
  const isMedia2048 = useMediaQuery(2048);
  const isMedia1920 = useMediaQuery(1920);

  const initialMaxShow = isMedia1920
    ? 15
    : isMedia2048
      ? 18
      : isMedia2400
        ? 21
        : 12;

  const oneStep = isMedia1920 ? 5 : isMedia2048 ? 6 : isMedia2400 ? 7 : 4;

  const [maxShow, setMaxShow] = useState(initialMaxShow);

  const handleMore = () => {
    setMaxShow((prevMaxShow: number) => prevMaxShow + oneStep);
  };

  const visibleSlots = slots.slice(0, maxShow);

  return (
    <div className={styles.Slots}>
      <h2 className={className || ''}>
        {isSlotsPage ? 'Pragmatic Play' : 'Слоты'}
      </h2>
      <div className={styles.SlotList}>
        {visibleSlots.map((slot, index) => {
          return (
            <Slot
              name={slot.name}
              provider={slot.provider}
              image={slot.image}
              id={slot.id}
              key={index}
            />
          );
        })}
      </div>
      {slots.length > maxShow && (
        <button className={styles.MoreButton} onClick={handleMore}>
          Загрузить ещё
        </button>
      )}
    </div>
  );
}
