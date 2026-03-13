import type { Currency, PaginationParams } from './common.ts';

export interface Payout {
  id: string;
  dateCreated: string;
  currency: Currency;
  total: string;
  status: 'pending' | 'success' | 'failed';
}

export interface ListPayoutsParams extends PaginationParams {}
