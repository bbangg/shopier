import type { Currency } from './common.ts';

export interface Balance {
  currency: Currency;
  amount: string;
  reservedAmount: string;
}
