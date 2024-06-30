import styles from './Chart.module.scss';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function Chart({
  data,
  labels,
}: {
  data: string[] | number[];
  labels: string[];
}) {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: true,
          color: 'rgba(45, 23, 91, .55)',
        },
        ticks: {
          display: false,
          stepSize: 10,
        },
      },
    },
  };

  const info = {
    labels: new Array(30).fill(''),
    datasets: [
      {
        data: data,
        borderColor: 'white',
        borderWidth: 3,
        backgroundColor: 'rgba(56, 29, 113, .5)',
        pointRadius: 0,
        tension: 0,
      },
    ],
  };

  return (
    <div style={{ position: 'relative' }}>
      <Line options={options} data={info} className={styles.Chart} />
      <ul className={styles.ChartLabels}>
        {labels.slice(0, 4).map((label) => {
          return (
            <li className={styles.ChartLabel} key={label}>
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
