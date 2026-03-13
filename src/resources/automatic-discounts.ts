import type { HttpClient } from '../http.ts';
import type { AutomaticDiscount, CreateAutomaticDiscountInput, ListAutomaticDiscountsParams, UpdateAutomaticDiscountInput } from '../types/discount.ts';
import type { PaginatedResponse } from '../types/common.ts';

export class AutomaticDiscountsResource {
  constructor(private http: HttpClient) {}

  async list(params?: ListAutomaticDiscountsParams): Promise<PaginatedResponse<AutomaticDiscount>> {
    return this.http.getPaginated<AutomaticDiscount>('/discounts/automatic', params);
  }

  async get(id: string): Promise<AutomaticDiscount> {
    return this.http.get<AutomaticDiscount>(`/discounts/automatic/${id}`);
  }

  async create(data: CreateAutomaticDiscountInput): Promise<AutomaticDiscount> {
    return this.http.post<AutomaticDiscount>('/discounts/automatic', data);
  }

  async update(id: string, data: UpdateAutomaticDiscountInput): Promise<AutomaticDiscount> {
    return this.http.put<AutomaticDiscount>(`/discounts/automatic/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return this.http.delete<void>(`/discounts/automatic/${id}`);
  }
}
