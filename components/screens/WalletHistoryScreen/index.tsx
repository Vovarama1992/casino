import React from 'react';

import { WithdrawalPaymentSystems } from '@/data/payments';
import styles from './WalletHistoryScreen.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NavigationArrow from './icons/NavigationArrow';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { toast } from 'react-toastify';
import { getWalletHistory } from '@/api/wallet';
import { IWalletHistory } from '@/types/payments';
import { formatDate, formatTime } from '@/utils/formatDate';

export default function WalletHistoryScreen() {
  const [history, setHistory] = useState([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = useMediaQuery(480) ? 6 : 3;
  const [loader, setLoader] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await getWalletHistory({
          url: `/wallet/history?page=${currentPage}&limit=${itemsPerPage}`,
        });
        setTotalPages(Math.ceil(response.total / itemsPerPage));
        setHistory(response.transactions);
        setLoader(false);
      } catch (error: any) {
        setLoader(false);
        console.error(error);
        toast.error(
          error.response.data.detail || 'Произошла ошибка. Повторите позже',
        );
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.WalletHistoryList}>
      {history.length > 0 ? (
        <>
          {history.map((item: IWalletHistory) => {
            const paymentSystem = WithdrawalPaymentSystems.find(
              (ps) => ps.slug === item.payment_system,
            );
            const icon = paymentSystem ? paymentSystem.icon : null;
            const date = formatDate(item.created_at);
            const time = formatTime(item.created_at);
            return (
              <div className={styles.WalletHistoryItem} key={item.id}>
                <div className={styles.PaymentSystem}>
                  <div className={styles.PaymentSystemIcon}>{icon}</div>
                  <span className={styles.PaymentSystemAddress}>
                    {item.to_account}
                    +7999******
                  </span>
                </div>
                <span className={styles.PaymentDate}>
                  {date} / {time}
                </span>
                <div className="flex items-center gap-[10px]">
                  <div className={styles.PaymentAmount}>
                    {item.amount}
                    <div className={styles.PaymentAmountIcon}>
                      <Image
                        src="/media/Currency.svg"
                        alt="MoonCoin"
                        width={0}
                        height={0}
                      />
                    </div>
                  </div>
                  <div className={styles.PaymentStatusBox}>
                    <button
                      className={styles.PaymentStatus}
                      style={{
                        color:
                          item.status === 'В ожидании'
                            ? '#814113'
                            : item.status === 'Отклонено'
                              ? '#891212'
                              : '#427C13',
                        backgroundColor:
                          item.status === 'В ожидании'
                            ? '#4A2409'
                            : item.status === 'Отклонено'
                              ? '#4A0909'
                              : '#264A09',
                      }}
                    >
                      {item.status || item.type === 0
                        ? 'Пополнено'
                        : item.type === 1 && 'Выплачено'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {totalPages > 1 && (
            <>
              <div className={styles.Pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => changePage(index + 1)}
                    className={`${styles.PaginationButton} ${
                      currentPage === index + 1
                        ? styles.PaginationButtonActive
                        : ''
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className={styles.Navigation}>
                <button
                  className={styles.NavigationButton}
                  onClick={goToPreviousPage}
                >
                  <NavigationArrow />
                </button>
                <button
                  className={styles.NavigationButton}
                  onClick={goToNextPage}
                >
                  <NavigationArrow />
                </button>
              </div>
            </>
          )}
        </>
      ) : loader ? (
        'Загрузка'
      ) : (
        'Нет истории'
      )}
    </div>
  );
}
