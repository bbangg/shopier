import type { HttpClient } from '../http.ts';
import type { CreateProductInput, ListProductsParams, Product, UpdateProductInput } from '../types/product.ts';
import type { PaginatedResponse } from '../types/common.ts';

export class ProductsResource {
  constructor(private http: HttpClient) {}

  async list(params?: ListProductsParams): Promise<PaginatedResponse<Product>> {
    return this.http.getPaginated<Product>('/products', params);
  }

  async get(id: string): Promise<Product> {
    return this.http.get<Product>(`/products/${id}`);
  }

  async create(data: CreateProductInput): Promise<Product> {
    return this.http.post<Product>('/products', data);
  }

  async update(id: string, data: UpdateProductInput): Promise<Product> {
    return this.http.put<Product>(`/products/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return this.http.delete<void>(`/products/${id}`);
  }
}
