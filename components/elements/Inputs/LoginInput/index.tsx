'use client';
import React, { ChangeEvent, forwardRef } from 'react';
import styles from '../Input.module.scss';

// Используем forwardRef для поддержки передачи ref
const LoginInput = forwardRef<
  HTMLInputElement,
  {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    className?: string;
    error?: string;
  }
>(({ value, onChange, placeholder, className, error }, ref) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <input
        ref={ref} // Поддержка ref
        className={`${className || ''} ${styles.Input} ${error ? styles.InputError : ''}`}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <span className={styles.Error}>{error}</span>}
    </div>
  );
});

// Добавляем displayName для отладки
LoginInput.displayName = 'LoginInput';

export default LoginInput;
