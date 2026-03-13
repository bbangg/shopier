import type { HttpClient } from '../http.ts';
import type { ShopOwner, ShopSetting, UpdateShopSettingInput } from '../types/shop.ts';

export class ShopResource {
  constructor(private http: HttpClient) {}

  async getOwner(): Promise<ShopOwner> {
    return this.http.get<ShopOwner>('/shop/owner');
  }

  async getSettings(): Promise<ShopSetting> {
    return this.http.get<ShopSetting>('/shop/settings');
  }

  async updateSettings(data: UpdateShopSettingInput): Promise<ShopSetting> {
    return this.http.put<ShopSetting>('/shop/settings', data);
  }
}
