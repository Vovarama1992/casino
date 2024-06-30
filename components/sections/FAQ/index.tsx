'use client';

import React from 'react';

import { questions } from '@/data/questions';
import styles from './FAQ.module.scss';
import QuestionIcon from './icons/QuestionIcon';
import { useState } from 'react';
import ArrowIcon from './icons/ArrowIcon';
import PageTitle from '@/components/elements/PageTitle';

export default function FAQ() {
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  const handleShowDropdown = (index: number) => {
    if (index === showDropdown) {
      setShowDropdown(null);
    } else {
      setShowDropdown(index);
    }
  };

  return (
    <section className={styles.FAQ}>
      <PageTitle title="FAQ - Ответы на вопросы" />
      <ul className={styles.List}>
        {questions.map((question, index) => {
          return (
            <li
              className={`${styles.ListItem} ${showDropdown === index ? styles.ListItemShow : ''}`}
              key={index}
            >
              <button
                className={styles.ListItemLabel}
                onClick={() => handleShowDropdown(index)}
              >
                <div className={styles.ListItemIcon}>
                  <QuestionIcon />
                </div>
                {question.label}
                <ArrowIcon className={styles.ArrowIcon} />
              </button>
              <div
                className={styles.ListItemAnswer}
                dangerouslySetInnerHTML={{ __html: question.answer }}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
