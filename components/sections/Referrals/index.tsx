'use client';

import React from 'react';

import styles from './Referrals.module.scss';
import PageTitle from '@/components/elements/PageTitle';
import { config } from '@/data/config';
import { useUnit } from 'effector-react';
import { $user } from '@/context/user';
import CopyIcon from './icons/CopyIcon';
import { useEffect, useState } from 'react';
import { getReferralStatsFx } from '@/api/user';
import copy from 'copy-to-clipboard';
import Image from 'next/image';

import Astronaut from './images/decor/astronaut.png';
import Chart from '@/components/modules/Chart';

interface LastMonthData {
  [date: string]: number;
}

interface IReferralStats {
  last_month: LastMonthData;
  total_referrals: number;
  total_revenue: string;
}

export default function Referrals() {
  const user = useUnit($user);
  const referralLink = `${config.domen}?referrer_id=${user?.id}`;

  const [referralStats, setReferralStats] = useState<IReferralStats>();

  const handleCopyLink = () => {
    copy(`https://${referralLink}`);
  };

  useEffect(() => {
    const getReferralStats = async () => {
      try {
        const data = await getReferralStatsFx({
          url: '/users/me/referrals-stats',
        });
        setReferralStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    getReferralStats();
  }, []);

  function transformData(data: IReferralStats): number[] {
    const dates = Object.keys(data.last_month).sort();

    const values = dates.map((date) => data.last_month[date]);

    return values;
  }

  function getLabels(data: IReferralStats): string[] {
    const dates = Object.keys(data.last_month).sort();

    const labels = [dates[0], dates[9], dates[19], dates[29]].filter(
      (date) => date !== undefined,
    );

    return labels;
  }

  const chartData = referralStats ? transformData(referralStats) : [];

  const labels = referralStats ? getLabels(referralStats) : [];

  return (
    <section className={styles.Referrals}>
      <PageTitle title="Реферальная система" />
      <div className={styles.Wrapper}>
        <div className={`${styles.Link} ${styles.Item}`}>
          <div className={styles.LinkInfo}>
            <h5 className={styles.LinkInfoTitle}>Реферальная ccылка</h5>
            <p className={styles.LinkInfoDescription}>
              Делитесь своей ссылкой и получайте 10% от первого депозита сразу
              на основной баланс
            </p>
          </div>
          <div className={styles.LinkInputBox}>
            <div style={{ position: 'relative' }}>
              <input
                className={styles.LinkInput}
                type="text"
                value={referralLink}
                readOnly
              />
              <button
                className={styles.LinkCopyButton}
                onClick={handleCopyLink}
              >
                <CopyIcon />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.Statistics}>
          <div className={`${styles.ChartBox} ${styles.Item}`}>
            <h3 className={styles.Title}>Статистика за месяц</h3>
            <Chart data={chartData} labels={labels} />
          </div>
          <div className={`${styles.TotalStatistics} ${styles.Item}`}>
            <h3 className={styles.Title}>Общая статистика</h3>
            <ul className={styles.StatisticsList}>
              <li className={styles.StatisticsListItem}>
                <h4>Рефералов</h4>
                <span>{referralStats?.total_referrals || '0'}</span>
              </li>
              <li className={styles.StatisticsListItem}>
                <h4>Заработано всего</h4>
                <span>{referralStats?.total_revenue || '0'}</span>
              </li>
            </ul>
            <Image
              className={styles.DecorImage}
              src={Astronaut}
              alt="Astronaut"
              width={0}
              height={0}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
