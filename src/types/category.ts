import type { PaginationParams } from './common.ts';

export interface Category {
  id: string;
  title: string;
  dateCreated: string;
  dateUpdated: string;
  productCount: number;
}

export interface CreateCategoryInput {
  title: string;
}

export interface UpdateCategoryInput {
  title: string;
}

export interface ListCategoriesParams extends PaginationParams {}
