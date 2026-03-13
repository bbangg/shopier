import type { HttpClient } from '../http.ts';
import type { Category, CreateCategoryInput, ListCategoriesParams, UpdateCategoryInput } from '../types/category.ts';
import type { PaginatedResponse } from '../types/common.ts';

export class CategoriesResource {
  constructor(private http: HttpClient) {}

  async list(params?: ListCategoriesParams): Promise<PaginatedResponse<Category>> {
    return this.http.getPaginated<Category>('/categories', params);
  }

  async get(id: string): Promise<Category> {
    return this.http.get<Category>(`/categories/${id}`);
  }

  async create(data: CreateCategoryInput): Promise<Category> {
    return this.http.post<Category>('/categories', data);
  }

  async update(id: string, data: UpdateCategoryInput): Promise<Category> {
    return this.http.put<Category>(`/categories/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return this.http.delete<void>(`/categories/${id}`);
  }
}
