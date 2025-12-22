
export type UserType = 'individual' | 'business';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar?: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  country: string;
  type: 'bank' | 'wallet' | 'cash';
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  receiverName: string;
  serviceType: 'Bank Transfer' | 'Cash Pickup' | 'Wallet Transfer';
  status: 'Completed' | 'Pending' | 'Failed';
  fees: number;
}

export enum TransferStep {
  AMOUNT = 1,
  BENEFICIARY = 2,
  DETAILS = 3,
  PAYMENT = 4,
  REVIEW = 5
}
