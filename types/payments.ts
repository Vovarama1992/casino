import { SVGProps } from 'react';

export interface IPaymentSystem {
  name: string;
  slug: string;
  icon: SVGProps<SVGSVGElement> | any;
}

export interface IWalletHistory {
  id: number;
  payment_system: string;
  type: number;
  amount: number;
  created_at: string;
  to_account: string;
  from_account: string;
  status: string;
}
