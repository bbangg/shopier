import type { Currency, PaginationParams } from './common.ts';

export interface Refund {
  id: string;
  orderId: string;
  type: 'full' | 'partial';
  status: 'pending' | 'failed' | 'succeeded';
  dateCreated: string;
  dateRefunded?: string;
  total: string;
  currency: Currency;
}

export interface CreateRefundInput {
  orderId: string;
  type: 'full' | 'partial';
  amount?: string;
}

export interface ListRefundsParams extends PaginationParams {}
