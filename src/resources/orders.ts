import type { HttpClient } from '../http.ts';
import type { ListOrdersParams, Order, UpdateOrderInput } from '../types/order.ts';
import type { PaginatedResponse } from '../types/common.ts';
import type { Transaction } from '../types/transaction.ts';

export class OrdersResource {
  constructor(private http: HttpClient) {}

  async list(params?: ListOrdersParams): Promise<PaginatedResponse<Order>> {
    return this.http.getPaginated<Order>('/orders', params);
  }

  async get(id: string): Promise<Order> {
    return this.http.get<Order>(`/orders/${id}`);
  }

  async update(id: string, data: UpdateOrderInput): Promise<Order> {
    return this.http.put<Order>(`/orders/${id}`, data);
  }

  async getTransaction(orderId: string): Promise<Transaction> {
    return this.http.get<Transaction>(`/orders/transactions/${orderId}`);
  }
}
