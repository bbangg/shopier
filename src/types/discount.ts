import type { PaginationParams } from './common.ts';

export interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: string;
  dateCreated: string;
  dateUpdated: string;
  usageLimit?: number;
  usageCount: number;
}

export interface AutomaticDiscount {
  id: string;
  title: string;
  type: 'percentage' | 'fixed';
  value: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface CreateDiscountCodeInput {
  code: string;
  type: 'percentage' | 'fixed';
  value: string;
  usageLimit?: number;
}

export interface UpdateDiscountCodeInput extends Partial<CreateDiscountCodeInput> {}

export interface CreateAutomaticDiscountInput {
  title: string;
  type: 'percentage' | 'fixed';
  value: string;
}

export interface UpdateAutomaticDiscountInput extends Partial<CreateAutomaticDiscountInput> {}

export interface ListDiscountCodesParams extends PaginationParams {}
export interface ListAutomaticDiscountsParams extends PaginationParams {}
