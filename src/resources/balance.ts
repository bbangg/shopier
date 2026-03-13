import type { HttpClient } from '../http.ts';
import type { Balance } from '../types/balance.ts';
import type { ListTransactionsParams, Transaction } from '../types/transaction.ts';
import type { PaginatedResponse } from '../types/common.ts';

export class BalanceResource {
  constructor(private http: HttpClient) {}

  async get(): Promise<Balance> {
    return this.http.get<Balance>('/balance');
  }

  async listTransactions(params?: ListTransactionsParams): Promise<PaginatedResponse<Transaction>> {
    return this.http.getPaginated<Transaction>('/balance/transactions', params);
  }

  async getTransaction(orderId: string): Promise<Transaction> {
    return this.http.get<Transaction>(`/balance/transactions/${orderId}`);
  }
}
