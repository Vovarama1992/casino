'use client';

import React from 'react';

import PageTitle from '@/components/elements/PageTitle';
import styles from './Support.module.scss';
import { useEffect, useState } from 'react';
import AttachIcon from './icons/AttachIcon';
import { IAppeal } from '@/types/profile';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ArrowIcon from './icons/ArrowIcon';
import { toast } from 'react-toastify';
import { createTicket, getTicket, getTickets } from '@/api/support';
import { formatDateToText } from '@/utils/formatDate';
import { useUnit } from 'effector-react';
import { $user } from '@/context/user';
import ChatInterface from '@/components/modules/ChatInterface';

export default function Support() {
  const user = useUnit($user);
  const isLogin = user?.id;
  const [selectedAppeal, setSelectedAppeal] = useState<IAppeal | null>(null);
  const [createAppealMode, setCreateAppealMode] = useState(false);
  const [subject, setSubject] = useState('');
  const [firstMessage, setFirstMessage] = useState('');
  const [tickets, setTickets] = useState<IAppeal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTickets({
          url: `/tickets?limit=30&page=1`,
        });

        setTickets(response);
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchData();
  }, [createAppealMode]);

  const openAppeal = async ({ id }: { id: number }) => {
    try {
      const response = await getTicket({
        url: `/tickets/${id}`,
      });

      setSelectedAppeal(response);
      console.log(response);
    } catch (error: any) {
      console.error(error);
      toast.error('Произошла ошибка. Повторите позже');
    }
  };

  const handleChangeAppealMode = () => {
    if (isLogin) {
      setSelectedAppeal(null);
      setCreateAppealMode(true);
    } else {
      toast.warning('Авторизуйтесь, чтобы создать обращение');
    }
  };

  const handleBackButton = () => {
    setSelectedAppeal(null);
    setCreateAppealMode(false);
  };

  const createAppeal = async () => {
    console.log('subj: ' + subject);
    console.log('firstMessage: ' + firstMessage);
    if (subject && firstMessage) {
      try {
        await createTicket({
          url: '/tickets/',
          subject: subject,
          message: firstMessage,
        });

        console.log(
          'Creating ticket with subject:',
          subject,
          'and message:',
          firstMessage,
        );

        handleBackButton();
        setSubject('');
        setFirstMessage('');
      } catch (error: any) {
        console.error(error);
        toast.error(
          error.response?.data?.detail || 'Произошла ошибка. Повторите позже',
        );
      }
    } else {
      toast.error('Заполните все поля');
    }
  };

  const isMedia1200 = useMediaQuery(1200);

  return (
    <section className={styles.Support}>
      <PageTitle title="Поддержка" />
      <div className={styles.Wrapper}>
        {!isMedia1200 && (
          <div className={styles.Appeals}>
            <ul className={styles.AppealList}>
              {tickets &&
                tickets.map((appeal: IAppeal) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                    <li
                      className={`${styles.AppealListItem} ${appeal.id === selectedAppeal?.id ? styles.AppealListItemActive : ''}`}
                      onClick={() => openAppeal({ id: appeal.id })}
                      key={appeal.id}
                    >
                      <div
                        className={styles.AppealStatus}
                        style={{
                          backgroundColor:
                            appeal.status === 'open'
                              ? '#FFB800'
                              : appeal.status === 'closed'
                                ? 'green'
                                : '',
                        }}
                      />
                      <h4 className={styles.AppealTitle}>{appeal.subject}</h4>
                      <span className={styles.AppealDate}>
                        {formatDateToText(appeal.created_at)}
                      </span>
                    </li>
                  );
                })}
            </ul>
            <button
              className={styles.AppealsButton}
              onClick={handleChangeAppealMode}
            >
              Создать обращение
            </button>
          </div>
        )}
        <div className={styles.Main}>
          <button className={styles.BackButton} onClick={handleBackButton}>
            <ArrowIcon /> Назад
          </button>
          {selectedAppeal ? (
            <div className={styles.SelectedAppeal}>
              <div className={styles.SelectedAppealTop}>
                <div className={styles.SelectedAppealTopInfo}>
                  <h2 className={styles.SelectedAppealTitle}>
                    {selectedAppeal.subject}
                  </h2>
                  <span className={styles.SelectedAppealDate}>
                    {formatDateToText(selectedAppeal.created_at)}
                  </span>
                </div>
                <button
                  className={styles.SelectedAppealCloseButton}
                  onClick={() => setSelectedAppeal(null)}
                >
                  Закрыть обращение
                </button>
              </div>
              <ChatInterface ticket={selectedAppeal} />
            </div>
          ) : createAppealMode ? (
            <div className={styles.NewAppeal}>
              <h2 className={styles.NewAppealTitle}>Создание обращения</h2>
              <input
                className={styles.NewAppealInput}
                type="text"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
                placeholder="Тема обращения..."
              />
              <textarea
                className={styles.NewAppealTextarea}
                placeholder="Введите сообщение..."
                onChange={(e) => setFirstMessage(e.target.value)}
                value={firstMessage}
                cols={30}
                rows={10}
              />
              <div className={styles.NewAppealButtons}>
                <button className={styles.AttachMediaButton}>
                  <AttachIcon />
                </button>
                <button
                  className={styles.CreateNewAppealButton}
                  onClick={createAppeal}
                >
                  Создать обращениееее
                </button>
              </div>
            </div>
          ) : isMedia1200 ? (
            <div className={styles.Appeals}>
              <ul className={styles.AppealList}>
                {tickets.map((appeal: IAppeal) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                    <li
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-ignore
                      className={`${styles.AppealListItem} ${appeal.id === selectedAppeal?.id ? styles.AppealListItemActive : ''}`}
                      onClick={() => openAppeal({ id: appeal.id })}
                      key={appeal.id}
                    >
                      <div
                        className={styles.AppealStatus}
                        style={{
                          backgroundColor:
                            appeal.status === 'open'
                              ? '#FFB800'
                              : appeal.status === 'closed'
                                ? 'green'
                                : '',
                        }}
                      />
                      <h4 className={styles.AppealTitle}>{appeal.subject}</h4>
                      <span className={styles.AppealDate}>
                        {formatDateToText(appeal.created_at)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <button
                className={styles.AppealsButton}
                onClick={handleChangeAppealMode}
              >
                Создать обращение
              </button>
            </div>
          ) : (
            <p className={styles.TipToCreate}>
              Выберите предыдущее обращение слева <br /> или{' '}
              <button onClick={handleChangeAppealMode}>создайте новое</button>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
