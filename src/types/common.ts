export type Currency = 'TRY' | 'USD' | 'EUR';
export type SortOrder = 'dateAsc' | 'dateDesc';
export type ProductType = 'physical' | 'digital';
export type StockStatus = 'inStock' | 'outOfStock';
export type FulfillmentStatus = 'fulfilled' | 'unfulfilled';
export type ShippingPayer = 'sellerPays' | 'buyerPays';
export type PaymentMethod = 'debitCard' | 'creditCard';

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: SortOrder;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface SortingMeta {
  sortBy: string;
  sortOrder: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
  sorting?: SortingMeta;
}

export interface ShopierClientOptions {
  accessToken: string;
  baseUrl?: string;
  maxRetries?: number;
}
