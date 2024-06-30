'use client';
import { ChangeEvent } from 'react';
import styles from '../Input.module.scss';
import React from 'react';
export default function LoginInput({
  value,
  onChange,
  placeholder,
  className,
  error,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  error?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <input
        className={`${className || ''} ${styles.Input} ${error ? styles.InputError : ''}`}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <span className={styles.Error}>{error}</span>
    </div>
  );
}
