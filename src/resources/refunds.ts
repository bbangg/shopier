import type { HttpClient } from '../http.ts';
import type { CreateRefundInput, ListRefundsParams, Refund } from '../types/refund.ts';
import type { PaginatedResponse } from '../types/common.ts';

export class RefundsResource {
  constructor(private http: HttpClient) {}

  async list(params?: ListRefundsParams): Promise<PaginatedResponse<Refund>> {
    return this.http.getPaginated<Refund>('/refunds', params);
  }

  async get(id: string): Promise<Refund> {
    return this.http.get<Refund>(`/refunds/${id}`);
  }

  async create(data: CreateRefundInput): Promise<Refund> {
    return this.http.post<Refund>('/refunds', data);
  }
}
