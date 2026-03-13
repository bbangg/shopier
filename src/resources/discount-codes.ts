import type { HttpClient } from '../http.ts';
import type { CreateDiscountCodeInput, DiscountCode, ListDiscountCodesParams, UpdateDiscountCodeInput } from '../types/discount.ts';
import type { PaginatedResponse } from '../types/common.ts';

export class DiscountCodesResource {
  constructor(private http: HttpClient) {}

  async list(params?: ListDiscountCodesParams): Promise<PaginatedResponse<DiscountCode>> {
    return this.http.getPaginated<DiscountCode>('/discounts/codes', params);
  }

  async get(id: string): Promise<DiscountCode> {
    return this.http.get<DiscountCode>(`/discounts/codes/${id}`);
  }

  async create(data: CreateDiscountCodeInput): Promise<DiscountCode> {
    return this.http.post<DiscountCode>('/discounts/codes', data);
  }

  async update(id: string, data: UpdateDiscountCodeInput): Promise<DiscountCode> {
    return this.http.put<DiscountCode>(`/discounts/codes/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return this.http.delete<void>(`/discounts/codes/${id}`);
  }
}
