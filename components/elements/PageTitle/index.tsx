import styles from './PageTitle.module.scss';
import React from 'react';
export default function PageTitle({ title }: { title: string }) {
  return <h2 className={styles.Title}>{title}</h2>;
}
