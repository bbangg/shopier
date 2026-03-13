import type { HttpClient } from '../http.ts';
import type { CreateSelectionInput, Selection, UpdateSelectionInput } from '../types/selection.ts';
import type { PaginatedResponse, PaginationParams } from '../types/common.ts';

export class SelectionsResource {
  constructor(private http: HttpClient) {}

  async list(params?: PaginationParams): Promise<PaginatedResponse<Selection>> {
    return this.http.getPaginated<Selection>('/selections', params);
  }

  async get(id: string): Promise<Selection> {
    return this.http.get<Selection>(`/selections/${id}`);
  }

  async create(data: CreateSelectionInput): Promise<Selection> {
    return this.http.post<Selection>('/selections', data);
  }

  async update(id: string, data: UpdateSelectionInput): Promise<Selection> {
    return this.http.put<Selection>(`/selections/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return this.http.delete<void>(`/selections/${id}`);
  }
}
