'use client';
import { ChangeEvent, useState } from 'react';
import styles from '../Input.module.scss';
import ViewIcon from './icons/ViewIcon';
import HideIcon from './icons/HideIcon';
import React from 'react';
export default function PasswordInput({
  value,
  onChange,
  placeholder,
  className,
  buttonClassName,
  error,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  buttonClassName?: string;
  error?: string;
}) {
  const [hidePassword, setHidePassword] = useState(true);

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const TogglePasswordButton = () => {
    return (
      <button
        className={`${buttonClassName || ''} ${styles.TogglePasswordButton}`}
        onClick={toggleHidePassword}
      >
        {hidePassword ? <HideIcon /> : <ViewIcon />}
      </button>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative' }}>
        <input
          className={`${className || ''} ${styles.Input} ${styles.PasswordInput} ${error ? styles.InputError : ''}`}
          type={hidePassword ? 'password' : 'text'}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <TogglePasswordButton />
      </div>
      <span className={styles.Error}>{error}</span>
    </div>
  );
}
