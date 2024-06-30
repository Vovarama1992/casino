import React from 'react';

import ModalLayout from '@/components/layouts/ModalLayout';
import { $walletModalIsOpen, closeWalletModal } from '@/context/modals';
import styles from './WalletModal.module.scss';
import { useUnit } from 'effector-react';
import WalletIcon from './icons/WalletIcon';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DepositScreen from '@/components/screens/DepositScreen';
import WithdrawalScreen from '../WithdrawalScreen';
import WalletHistoryScreen from '../WalletHistoryScreen';

export default function WalletModal() {
  const modalIsOpen = useUnit($walletModalIsOpen);

  return (
    <ModalLayout
      closeClick={() => closeWalletModal()}
      isOpen={modalIsOpen}
      className={styles.WalletModal}
    >
      <>
        <h2 className={styles.Title}>
          Кошелек <WalletIcon />
        </h2>
        <Tabs className={styles.Tabs}>
          <TabList className={styles.TabList}>
            <Tab className={styles.Tab} selectedClassName={styles.TabActive}>
              Пополнение
            </Tab>
            <Tab className={styles.Tab} selectedClassName={styles.TabActive}>
              Вывод
            </Tab>
            <Tab className={styles.Tab} selectedClassName={styles.TabActive}>
              История
            </Tab>
          </TabList>

          <TabPanel className={styles.TabPanel}>
            <DepositScreen />
          </TabPanel>
          <TabPanel className={styles.TabPanel}>
            <WithdrawalScreen />
          </TabPanel>
          <TabPanel className={styles.TabPanel}>
            <WalletHistoryScreen />
          </TabPanel>
        </Tabs>
      </>
    </ModalLayout>
  );
}
