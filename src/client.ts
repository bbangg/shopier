import { HttpClient } from './http.ts';
import type { ShopierClientOptions } from './types/common.ts';
import { ProductsResource } from './resources/products.ts';
import { OrdersResource } from './resources/orders.ts';
import { CategoriesResource } from './resources/categories.ts';
import { VariationsResource } from './resources/variations.ts';
import { SelectionsResource } from './resources/selections.ts';
import { DiscountCodesResource } from './resources/discount-codes.ts';
import { AutomaticDiscountsResource } from './resources/automatic-discounts.ts';
import { ShippingsResource } from './resources/shippings.ts';
import { WebhooksResource } from './resources/webhooks.ts';
import { BalanceResource } from './resources/balance.ts';
import { PayoutsResource } from './resources/payouts.ts';
import { RefundsResource } from './resources/refunds.ts';
import { ShopResource } from './resources/shop.ts';

export class ShopierClient {
  private http: HttpClient;

  private _products?: ProductsResource;
  private _orders?: OrdersResource;
  private _categories?: CategoriesResource;
  private _variations?: VariationsResource;
  private _selections?: SelectionsResource;
  private _discountCodes?: DiscountCodesResource;
  private _automaticDiscounts?: AutomaticDiscountsResource;
  private _shippings?: ShippingsResource;
  private _webhooks?: WebhooksResource;
  private _balance?: BalanceResource;
  private _payouts?: PayoutsResource;
  private _refunds?: RefundsResource;
  private _shop?: ShopResource;

  constructor(options: ShopierClientOptions) {
    if (!options.accessToken) {
      throw new Error('ShopierClient: accessToken is required');
    }
    this.http = new HttpClient(options);
  }

  get products(): ProductsResource {
    return this._products ??= new ProductsResource(this.http);
  }

  get orders(): OrdersResource {
    return this._orders ??= new OrdersResource(this.http);
  }

  get categories(): CategoriesResource {
    return this._categories ??= new CategoriesResource(this.http);
  }

  get variations(): VariationsResource {
    return this._variations ??= new VariationsResource(this.http);
  }

  get selections(): SelectionsResource {
    return this._selections ??= new SelectionsResource(this.http);
  }

  get discountCodes(): DiscountCodesResource {
    return this._discountCodes ??= new DiscountCodesResource(this.http);
  }

  get automaticDiscounts(): AutomaticDiscountsResource {
    return this._automaticDiscounts ??= new AutomaticDiscountsResource(this.http);
  }

  get shippings(): ShippingsResource {
    return this._shippings ??= new ShippingsResource(this.http);
  }

  get webhooks(): WebhooksResource {
    return this._webhooks ??= new WebhooksResource(this.http);
  }

  get balance(): BalanceResource {
    return this._balance ??= new BalanceResource(this.http);
  }

  get payouts(): PayoutsResource {
    return this._payouts ??= new PayoutsResource(this.http);
  }

  get refunds(): RefundsResource {
    return this._refunds ??= new RefundsResource(this.http);
  }

  get shop(): ShopResource {
    return this._shop ??= new ShopResource(this.http);
  }
}
