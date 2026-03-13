import type { Currency, PaginationParams } from './common.ts';

export interface Transaction {
  id: string;
  type: 'order' | 'payout' | 'refund' | 'other';
  dateCreated: string;
  currency: Currency;
  amount: string;
  description?: string;
  orderId?: string;
}

export interface ListTransactionsParams extends PaginationParams {}
