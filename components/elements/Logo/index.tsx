import { config } from '@/data/config';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Logo.module.scss';
import React from 'react';
export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`${styles.Logo} ${className ? className : ''}`}>
      <Image src="/media/Logo.svg" alt={config.name} width={0} height={0} />
    </Link>
  );
}
