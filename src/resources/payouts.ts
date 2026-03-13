import type { HttpClient } from '../http.ts';
import type { ListPayoutsParams, Payout } from '../types/payout.ts';
import type { ListTransactionsParams, Transaction } from '../types/transaction.ts';
import type { PaginatedResponse } from '../types/common.ts';

export class PayoutsResource {
  constructor(private http: HttpClient) {}

  async list(params?: ListPayoutsParams): Promise<PaginatedResponse<Payout>> {
    return this.http.getPaginated<Payout>('/payouts', params);
  }

  async get(id: string): Promise<Payout> {
    return this.http.get<Payout>(`/payouts/${id}`);
  }

  async listTransactions(payoutId: string, params?: ListTransactionsParams): Promise<PaginatedResponse<Transaction>> {
    return this.http.getPaginated<Transaction>(`/payouts/transactions/${payoutId}`, params);
  }
}
