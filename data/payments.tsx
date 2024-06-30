import React from 'react';

import { IPaymentSystem, IWalletHistory } from '@/types/payments';
import SBPIcon from './icons/payments/SBPIcon';
import CardsIcon from './icons/payments/CardsIcon';
import CryptocurrencyIcon from './icons/payments/CryptocurrencyIcon';
import YooMoneyIcon from './icons/payments/YooMoneyIcon';
import SberPayIcon from './icons/payments/SberPayIcon';

export const DepositPaymentSystems: IPaymentSystem[] = [
  {
    name: 'SberPay',
    slug: 'sberpay',
    icon: <SberPayIcon />,
  },
  {
    name: 'YooMoney',
    slug: 'yoomoney',
    icon: <YooMoneyIcon />,
  },
  {
    name: 'СБП',
    slug: 'faster_payment_system',
    icon: <SBPIcon />,
  },
  {
    name: 'Карты Visa/MC/MIR',
    slug: 'card',
    icon: <CardsIcon />,
  },
  {
    name: 'P2P',
    slug: 'p2p',
    icon: <CryptocurrencyIcon />,
  },
];

export const WithdrawalPaymentSystems: IPaymentSystem[] = [
  {
    name: 'SberPay',
    slug: 'sberpay',
    icon: <SberPayIcon />,
  },
  {
    name: 'YooMoney',
    slug: 'yoomoney',
    icon: <YooMoneyIcon />,
  },
  {
    name: 'СБП',
    slug: 'faster_payment_system',
    icon: <SBPIcon />,
  },
  {
    name: 'Карты Visa/MC/MIR',
    slug: 'card',
    icon: <CardsIcon />,
  },
  {
    name: 'P2P',
    slug: 'p2p',
    icon: <CryptocurrencyIcon />,
  },
];
