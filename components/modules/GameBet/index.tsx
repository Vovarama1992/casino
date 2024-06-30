'use client';
import React from 'react';

import { ChangeEvent, SVGProps, useState } from 'react';
import styles from './GameBet.module.scss';
import EditIcon from './icons/EditIcon';

type GameBetType = {
  title: string;
  icon: SVGProps<SVGSVGElement> | any;
  bets: {
    title: string;
    buttons: string[];
    mode: string;
    symbol?: string;
  }[];
  betButton?: boolean;
};

export default function GameBet({ title, icon, bets, betButton }: GameBetType) {
  return (
    <div className={styles.GameBet}>
      <h4 className={styles.Title}>
        {icon} {title}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ul className={styles.Options}>
          {bets.map((bet) => {
            const halfLength = Math.ceil(bet.buttons.length / 2);
            const firstHalf = bet.buttons.slice(0, halfLength);
            const secondHalf = bet.buttons.slice(halfLength);

            const [value, setValue] = useState('');
            const [editMode, setEditMode] = useState(false);

            const handleChangeInput = ({
              e,
              symbol,
            }: {
              e: ChangeEvent<HTMLInputElement>;
              symbol: string;
            }) => {
              let filteredValue = e.target.value.replace(/[^0-9.]/g, '');

              const dotCount = (filteredValue.match(/\./g) || []).length;
              if (dotCount > 1) {
                filteredValue = filteredValue.replace(/\.(?=.*\.)/g, '');
              }

              const dotIndex = filteredValue.indexOf('.');
              if (dotIndex !== -1) {
                filteredValue = filteredValue.slice(0, dotIndex + 3);
              }

              if (symbol) {
                filteredValue = filteredValue.slice(0, 2);
              }

              const finalValue = filteredValue + symbol;

              setValue(finalValue);
            };

            return (
              <li className={styles.Option} key={bet.title}>
                <h5 className={styles.OptionTitle}>{bet.title}</h5>
                <div className={styles.OptionButtons}>
                  {bet.mode === 'input' ? (
                    <>
                      {firstHalf.map((value) => (
                        <button
                          className={styles.OptionButton}
                          onClick={() => setValue(value)}
                          key={value}
                        >
                          {value}
                        </button>
                      ))}
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleChangeInput({ e: e, symbol: bet.symbol || '' })
                        }
                        className={styles.OptionInput}
                      />
                      {secondHalf.map((value) => (
                        <button
                          className={styles.OptionButton}
                          onClick={() => setValue(value)}
                          key={value}
                        >
                          {value}
                        </button>
                      ))}
                    </>
                  ) : (
                    bet.mode === 'edit' && (
                      <>
                        {editMode ? (
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              handleChangeInput({
                                e: e,
                                symbol: bet.symbol || '',
                              })
                            }
                            className={`${styles.OptionInput} ${styles.EditOptionInput}`}
                          />
                        ) : (
                          bet.buttons.map((value, index) => {
                            return (
                              <button
                                className={styles.OptionButton}
                                key={index}
                              >
                                {value}
                              </button>
                            );
                          })
                        )}
                        <button
                          className={styles.OptionButton}
                          onClick={() => setEditMode(!editMode)}
                        >
                          <EditIcon />
                        </button>
                      </>
                    )
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        {betButton && <button className={styles.Button}>Сделать ставку</button>}
      </div>
    </div>
  );
}
