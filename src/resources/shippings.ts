import type { HttpClient } from '../http.ts';
import type { CreateShippingInput, ListShippingsParams, Shipping } from '../types/shipping.ts';
import type { PaginatedResponse } from '../types/common.ts';

export class ShippingsResource {
  constructor(private http: HttpClient) {}

  async list(params?: ListShippingsParams): Promise<PaginatedResponse<Shipping>> {
    return this.http.getPaginated<Shipping>('/shippings', params);
  }

  async get(code: string): Promise<Shipping> {
    return this.http.get<Shipping>(`/shippings/${code}`);
  }

  async create(data: CreateShippingInput): Promise<Shipping> {
    return this.http.post<Shipping>('/shippings', data);
  }

  async delete(code: string): Promise<void> {
    return this.http.delete<void>(`/shippings/${code}`);
  }
}
