import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { $user } from '@/context/user';
import { useUnit } from 'effector-react';
import { toast } from 'react-toastify';
import {
  getWalletHistory,
  getPendingWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
} from '@/api/wallet';
import { WithdrawalPaymentSystems } from '@/data/payments';
import { IWalletHistory } from '@/types/payments';
import { formatDate, formatTime } from '@/utils/formatDate';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import NavigationArrow from './icons/NavigationArrow';
import styles from './WalletHistoryScreen.module.scss';
import { TransactionType } from '@/types/transactions';
const statusMap = {
  pending: 'на рассмотрении',
  confirmed: 'одобрено',
  rejected: 'отклонено',
} as const;

type Status = keyof typeof statusMap;

const getStatusLabel = (status: Status): string => {
  return statusMap[status];
};

export default function WalletHistoryScreen() {
  const [history, setHistory] = useState<IWalletHistory[]>([]);
  const [pendingWithdrawals, setPendingWithdrawals] = useState<
    IWalletHistory[]
  >([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = useMediaQuery(480) ? 6 : 3;
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const user = useUnit($user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        if (user?.username === 'admin') {
          const response = await getPendingWithdrawals({
            url: '/wallet/withdrawals/pending',
          });
          setPendingWithdrawals(response);
        } else {
          const response = await getWalletHistory({
            url: `/wallet/history?page=${currentPage}&limit=${itemsPerPage}`,
          });
          setTotalPages(Math.ceil(response.total / itemsPerPage));
          const filteredTransactions = response.transactions.filter(
            (item: IWalletHistory) =>
              item.type === TransactionType.IN ||
              item.type === TransactionType.OUT,
          );
          setHistory(filteredTransactions);
        }
        setLoader(false);
      } catch (error: any) {
        setLoader(false);
        console.error(error);
        toast.error(
          error.response?.data?.detail || 'Произошла ошибка. Повторите позже',
        );
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, user?.username]);

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

  const handleApprove = async (withdrawalId: number) => {
    try {
      await approveWithdrawal({
        url: '/wallet/withdrawals/confirm',
        withdrawalId,
      });
      toast.success('Заявка одобрена');
      setPendingWithdrawals((prev) =>
        prev.filter((w) => w.id !== withdrawalId),
      );
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.detail || 'Произошла ошибка при одобрении',
      );
    }
  };

  const handleReject = async (withdrawalId: number) => {
    try {
      await rejectWithdrawal({
        url: '/wallet/withdrawals/reject',
        withdrawalId,
      });
      toast.success('Заявка отклонена');
      setPendingWithdrawals((prev) =>
        prev.filter((w) => w.id !== withdrawalId),
      );
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.detail || 'Произошла ошибка при отклонении',
      );
    }
  };

  return (
    <div className={styles.WalletHistoryList}>
      {user?.username === 'admin' ? (
        pendingWithdrawals.length > 0 ? (
          <>
            {pendingWithdrawals.map((item: IWalletHistory) => (
              <div className={styles.WalletHistoryItem} key={item.id}>
                <div>ID пользователя: {item.user_id}</div>{' '}
                {/* Отображение user_id */}
                <div>Сумма: {Math.round(Number(item.amount))}</div>
                <div>Дата: {formatDate(item.created_at)}</div>
                <div className={styles.PaymentActions}>
                  <button
                    className={styles.ApproveButton}
                    onClick={() => handleApprove(item.id)}
                  >
                    Одобрить
                  </button>
                  <button
                    className={styles.RejectButton}
                    onClick={() => handleReject(item.id)}
                  >
                    Отклонить
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : loader ? (
          'Загрузка'
        ) : (
          'Нет заявок на вывод'
        )
      ) : history.length > 0 ? (
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
                    {Math.round(Number(item.amount))}
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
                      {getStatusLabel(item.status as Status)}
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
