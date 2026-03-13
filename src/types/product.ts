import type { Currency, PaginationParams, ProductType, ShippingPayer, StockStatus } from './common.ts';

export interface ProductMedia {
  id: string;
  type: 'image';
  url: string;
  placement: number;
}

export interface ProductPriceData {
  currency: Currency;
  price: string;
  discount: boolean;
  discountedPrice: string;
  shippingPrice: string;
}

export interface ProductCategory {
  id: string;
  title: string;
}

export interface ProductVariantPriceData {
  currency: Currency;
  price: string;
}

export interface ProductVariant {
  variationId: string[];
  variationTitle: string[];
  selectionId: string[];
  selectionTitle: string[];
  stockStatus: StockStatus;
  stockQuantity: number;
  media: Array<{
    id: string;
    type: 'image';
    url: string;
  }>;
  priceData: ProductVariantPriceData;
  primary: boolean;
}

export interface ProductOption {
  id: string;
  title: string;
  price: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  type: ProductType;
  dateCreated: string;
  dateUpdated: string;
  url: string;
  media: ProductMedia[];
  priceData: ProductPriceData;
  stockStatus: StockStatus;
  stockQuantity: number;
  shippingPayer: ShippingPayer;
  categories: ProductCategory[];
  variants: ProductVariant[];
  options: ProductOption[];
  singleOption: boolean;
  customListing: boolean;
  customNote: string;
  placementScore: number;
  dispatchDuration: number;
}

export interface CreateProductInput {
  title: string;
  description?: string;
  type: ProductType;
  media: Array<{
    type: 'image';
    url: string;
    placement: number;
  }>;
  priceData: {
    currency: Currency;
    price: string;
    discount?: boolean;
    discountedPrice?: string;
    shippingPrice?: string;
  };
  stockQuantity?: number;
  shippingPayer: ShippingPayer;
  categories?: Array<{ categoryId: string }>;
  variants?: Array<{
    selectionId: string[];
    stockQuantity: number;
    media?: Array<{ type: 'image'; url: string }>;
    priceData?: ProductVariantPriceData;
    primary?: boolean;
  }>;
  options?: Array<{
    optionId?: string;
    optionTitle?: string;
    optionPrice?: string;
  }>;
  singleOption?: boolean;
  customListing?: boolean;
  customNote?: string;
  placementScore?: number;
  dispatchDuration?: number;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {}

export interface ListProductsParams extends PaginationParams {
  dateStart?: string;
  dateEnd?: string;
  productType?: ProductType;
  shippingPayer?: ShippingPayer;
  stockStatus?: StockStatus;
  categoryId?: string[];
  selectionId?: string[];
  discount?: boolean;
  customListing?: boolean;
}
