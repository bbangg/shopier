import { createShopierError, ShopierTimeoutError } from './errors.ts';
import type { PaginatedResponse, PaginationParams, ShopierClientOptions } from './types/common.ts';

export class HttpClient {
  private accessToken: string;
  private baseUrl: string;
  private maxRetries: number;
  private timeout: number;

  constructor(options: ShopierClientOptions) {
    this.accessToken = options.accessToken;
    this.baseUrl = options.baseUrl?.replace(/\/$/, '') || 'https://api.shopier.com/v1';
    this.maxRetries = options.maxRetries ?? 3;
    this.timeout = options.timeout ?? 30000;
  }

  public async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('GET', path, { params });
  }

  public async post<T>(path: string, body?: any): Promise<T> {
    return this.request<T>('POST', path, { body });
  }

  public async put<T>(path: string, body?: any): Promise<T> {
    return this.request<T>('PUT', path, { body });
  }

  public async delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }

  public async getPaginated<T>(path: string, params?: PaginationParams & Record<string, any>): Promise<PaginatedResponse<T>> {
    const response = await this.requestFullResponse('GET', path, { params });
    const data = (await response.json()) as T[];
    
    return {
      data,
      pagination: {
        page: parseInt(response.headers.get('Shopier-Pagination-Page') || '1', 10),
        limit: parseInt(response.headers.get('Shopier-Pagination-Limit') || '0', 10),
        totalPages: parseInt(response.headers.get('Shopier-Pagination-Total-Pages') || '1', 10),
        totalItems: parseInt(response.headers.get('Shopier-Pagination-Total-Items') || '0', 10),
      },
      sorting: {
        sortBy: response.headers.get('Shopier-Sort-By') || '',
        sortOrder: response.headers.get('Shopier-Sort-Order') || '',
      },
    };
  }

  private async request<T>(method: string, path: string, options: { body?: any; params?: Record<string, any> } = {}): Promise<T> {
    const response = await this.requestFullResponse(method, path, options);
    
    if (response.status === 204 || response.headers.get('Content-Length') === '0') {
      return {} as T;
    }

    return response.json() as Promise<T>;
  }

  private async requestFullResponse(
    method: string, 
    path: string, 
    options: { body?: any; params?: Record<string, any> } = {},
    retryCount = 0
  ): Promise<Response> {
    const url = new URL(`${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`);
    
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value === undefined) return;
        if (Array.isArray(value)) {
          value.forEach(v => url.searchParams.append(key, String(v)));
        } else {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const headers = new Headers({
      'Authorization': `Bearer ${this.accessToken}`,
      'Accept': 'application/json',
    });

    if (options.body) {
      headers.set('Content-Type', 'application/json');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        method,
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });

      if (response.status === 429 && retryCount < this.maxRetries) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '60', 10);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        return this.requestFullResponse(method, path, options, retryCount + 1);
      }

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw createShopierError(response.status, response.statusText, body, response.headers);
      }

      return response;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new ShopierTimeoutError(408, 'Request Timeout', { message: `Request timed out after ${this.timeout}ms` });
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
