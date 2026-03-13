import type { Currency } from './common.ts';

export interface ShopOwner {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyName?: string;
}

export interface ShopSetting {
  shopName: string;
  shopUrl: string;
  currency: Currency;
  logoUrl?: string;
  maintenanceMode: boolean;
}

export interface UpdateShopSettingInput {
  shopName?: string;
  maintenanceMode?: boolean;
}
