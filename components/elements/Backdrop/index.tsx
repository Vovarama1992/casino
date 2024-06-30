import React from 'react';
import styles from './Backdrop.module.scss';

export default function Backdrop({ onClick }: { onClick?: () => void }) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={styles.Backdrop} onClick={onClick} onKeyDown={onClick} />
  );
}
