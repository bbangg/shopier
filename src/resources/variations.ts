import type { HttpClient } from '../http.ts';
import type { CreateVariationInput, UpdateVariationInput, Variation } from '../types/variation.ts';
import type { PaginatedResponse, PaginationParams } from '../types/common.ts';

export class VariationsResource {
  constructor(private http: HttpClient) {}

  async list(params?: PaginationParams): Promise<PaginatedResponse<Variation>> {
    return this.http.getPaginated<Variation>('/variations', params);
  }

  async get(id: string): Promise<Variation> {
    return this.http.get<Variation>(`/variations/${id}`);
  }

  async create(data: CreateVariationInput): Promise<Variation> {
    return this.http.post<Variation>('/variations', data);
  }

  async update(id: string, data: UpdateVariationInput): Promise<Variation> {
    return this.http.put<Variation>(`/variations/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return this.http.delete<void>(`/variations/${id}`);
  }
}
