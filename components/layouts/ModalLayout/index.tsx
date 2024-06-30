'use client';
import React from 'react';
import { ReactNode, useEffect } from 'react';
import CrossIcon from './icons/CrossIcon';
import styles from './ModalLayout.module.scss';
import Backdrop from '@/components/elements/Backdrop';
import { useUnit } from 'effector-react';
import { $mobileMenuIsOpen } from '@/context/modals';
type ModalLayoutPropsType = {
  children: ReactNode;
  closeClick: () => void;
  isOpen: boolean;
  className?: string;
};

export default function ModalLayout({
  children,
  closeClick,
  isOpen,
  className,
}: ModalLayoutPropsType) {
  const lockPage =
    typeof window !== 'undefined' && localStorage.getItem('lock');
  const mobileMenuIsOpen = useUnit($mobileMenuIsOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      typeof window !== 'undefined' && localStorage.setItem('lock', 'true');
    } else if (mobileMenuIsOpen) {
      document.body.style.overflow = 'hidden';
      typeof window !== 'undefined' && localStorage.setItem('lock', 'true');
    } else if (lockPage && !mobileMenuIsOpen) {
      document.body.style.overflow = '';
      typeof window !== 'undefined' && localStorage.setItem('lock', 'false');
    } else {
      document.body.style.overflow = '';
      typeof window !== 'undefined' && localStorage.setItem('lock', 'false');
    }
  }, [isOpen, mobileMenuIsOpen, lockPage]);

  return (
    isOpen && (
      <>
        <Backdrop onClick={closeClick} />
        <div className={`${styles.ModalLayout} ${className || ''}`}>
          <button className={styles.CloseButton} onClick={closeClick}>
            <CrossIcon />
          </button>
          {children}
        </div>
      </>
    )
  );
}
